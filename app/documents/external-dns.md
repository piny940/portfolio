## はじめに

kubernetesにいろいろなサービスを移行する中で、毎度毎度cloudflare tunnelにDNSの設定を手動で入力しに行くのがとても手間だと感じていました。  
そこで今回は、kubernetesでIngressを作成するとそれに対応するDNS設定がcloudflare tunnelに自動で反映されるようにしました。

完成品は Github 上に公開してありますので参考程度にどうぞ  
https://github.com/piny940/external-dns

## 方針

外部の DNS を自動で設定するアプリケーションはすでに[external-dns](https://github.com/kubernetes-sigs/external-dns)で実現されていました。external-dns は cloudflare にも対応していたのですが、cloudflare tunnel には対応していなかったので、その差分を対応することにしました。

cloudflare DNS から cloudflare tunnel に変えるには、具体的には A レコードの追加/削除部分を書き換える必要があります。

A レコードが追加される際には、

- cloudflare tunnel の設定(configuration)の ingress に新しいレコードを追加([参考](https://developers.cloudflare.com/api/operations/cloudflare-tunnel-configuration-put-configuration))
- cloudflare DNS に、`{TUNNEL_ID}.cfargotunnel.com`への CNAME レコードを追加

の 2 つをする必要があります。

最後に`main.go`の Provider 一覧に`cloudflaretunnel`を追加すれば完成です。

## 実装

実装は`cloudflaretunnel.go`に記述していきます。

<details>
<summary>完成したコード</summary>

```golang

/*
Copyright 2017 The Kubernetes Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package cloudflaretunnel

import (
	"context"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"

	cloudflare "github.com/cloudflare/cloudflare-go"
	log "github.com/sirupsen/logrus"

	"sigs.k8s.io/external-dns/endpoint"
	"sigs.k8s.io/external-dns/plan"
	"sigs.k8s.io/external-dns/provider"
	"sigs.k8s.io/external-dns/source"
)

const (
	// cloudFlareCreate is a ChangeAction enum value
	cloudFlareCreate = "CREATE"
	// cloudFlareDelete is a ChangeAction enum value
	cloudFlareDelete = "DELETE"
	// defaultCloudFlareRecordTTL 1 = automatic
	defaultCloudFlareRecordTTL = 1
)

// We have to use pointers to bools now, as the upstream cloudflare-go library requires them
// see: https://github.com/cloudflare/cloudflare-go/pull/595

// proxyEnabled is a pointer to a bool true showing the record should be proxied through cloudflare
var proxyEnabled *bool = boolPtr(true)

// proxyDisabled is a pointer to a bool false showing the record should not be proxied through cloudflare
var proxyDisabled *bool = boolPtr(false)

var defaultOriginRequest = &cloudflare.OriginRequestConfig{
	Http2Origin: boolPtr(true),
	NoTLSVerify: boolPtr(true),
}

var recordTypeProxyNotSupported = map[string]bool{
	"LOC": true,
	"MX":  true,
	"NS":  true,
	"SPF": true,
	"TXT": true,
	"SRV": true,
}

// cloudFlareDNS is the subset of the CloudFlare API that we actually use.  Add methods as required. Signatures must match exactly.
type cloudFlareDNS interface {
	UserDetails(ctx context.Context) (cloudflare.User, error)
	ZoneIDByName(zoneName string) (string, error)
	ListZones(ctx context.Context, zoneID ...string) ([]cloudflare.Zone, error)
	ListZonesContext(ctx context.Context, opts ...cloudflare.ReqOption) (cloudflare.ZonesResponse, error)
	ZoneDetails(ctx context.Context, zoneID string) (cloudflare.Zone, error)
	ListDNSRecords(ctx context.Context, rc *cloudflare.ResourceContainer, rp cloudflare.ListDNSRecordsParams) ([]cloudflare.DNSRecord, *cloudflare.ResultInfo, error)
	CreateDNSRecord(ctx context.Context, rc *cloudflare.ResourceContainer, rp cloudflare.CreateDNSRecordParams) (cloudflare.DNSRecord, error)
	DeleteDNSRecord(ctx context.Context, rc *cloudflare.ResourceContainer, recordID string) error
	GetTunnelConfiguration(ctx context.Context, rc *cloudflare.ResourceContainer, tunnelID string) (cloudflare.TunnelConfigurationResult, error)
	UpdateTunnelConfiguration(ctx context.Context, rc *cloudflare.ResourceContainer, cp cloudflare.TunnelConfigurationParams) (cloudflare.TunnelConfigurationResult, error)
}

type service struct {
	service *cloudflare.API
}

func (z service) UserDetails(ctx context.Context) (cloudflare.User, error) {
	return z.service.UserDetails(ctx)
}

func (z service) ListZones(ctx context.Context, zoneID ...string) ([]cloudflare.Zone, error) {
	return z.service.ListZones(ctx, zoneID...)
}

func (z service) ZoneIDByName(zoneName string) (string, error) {
	return z.service.ZoneIDByName(zoneName)
}

func (z service) CreateDNSRecord(ctx context.Context, rc *cloudflare.ResourceContainer, rp cloudflare.CreateDNSRecordParams) (cloudflare.DNSRecord, error) {
	return z.service.CreateDNSRecord(ctx, rc, rp)
}

func (z service) ListDNSRecords(ctx context.Context, rc *cloudflare.ResourceContainer, rp cloudflare.ListDNSRecordsParams) ([]cloudflare.DNSRecord, *cloudflare.ResultInfo, error) {
	return z.service.ListDNSRecords(ctx, rc, rp)
}

func (z service) DeleteDNSRecord(ctx context.Context, rc *cloudflare.ResourceContainer, recordID string) error {
	return z.service.DeleteDNSRecord(ctx, rc, recordID)
}

func (z service) ListZonesContext(ctx context.Context, opts ...cloudflare.ReqOption) (cloudflare.ZonesResponse, error) {
	return z.service.ListZonesContext(ctx, opts...)
}

func (z service) ZoneDetails(ctx context.Context, zoneID string) (cloudflare.Zone, error) {
	return z.service.ZoneDetails(ctx, zoneID)
}

func (z service) GetTunnelConfiguration(ctx context.Context, rc *cloudflare.ResourceContainer, tunnelID string) (cloudflare.TunnelConfigurationResult, error) {
	return z.service.GetTunnelConfiguration(ctx, rc, tunnelID)
}

func (z service) UpdateTunnelConfiguration(ctx context.Context, rc *cloudflare.ResourceContainer, cp cloudflare.TunnelConfigurationParams) (cloudflare.TunnelConfigurationResult, error) {
	return z.service.UpdateTunnelConfiguration(ctx, rc, cp)
}

// CloudFlareProvider is an implementation of Provider for CloudFlare DNS.
type CloudFlareProvider struct {
	provider.BaseProvider
	Client cloudFlareDNS
	// only consider hosted zones managing domains ending in this suffix
	domainFilter      endpoint.DomainFilter
	zoneIDFilter      provider.ZoneIDFilter
	proxiedByDefault  bool
	DryRun            bool
	DNSRecordsPerPage int
	TunnelID          string
	AccountID         string
}

// cloudFlareChange differentiates between ChangActions
type cloudFlareChange struct {
	Action         string
	ResourceRecord cloudflare.DNSRecord
}

// RecordParamsTypes is a typeset of the possible Record Params that can be passed to cloudflare-go library
type RecordParamsTypes interface {
	cloudflare.UpdateDNSRecordParams | cloudflare.CreateDNSRecordParams
}

// getUpdateDNSRecordParam is a function that returns the appropriate Record Param based on the cloudFlareChange passed in
func getUpdateDNSRecordParam(cfc cloudFlareChange) cloudflare.UpdateDNSRecordParams {
	return cloudflare.UpdateDNSRecordParams{
		Name:    cfc.ResourceRecord.Name,
		TTL:     cfc.ResourceRecord.TTL,
		Proxied: cfc.ResourceRecord.Proxied,
		Type:    cfc.ResourceRecord.Type,
		Content: cfc.ResourceRecord.Content,
	}
}

// getCreateDNSRecordParam is a function that returns the appropriate Record Param based on the cloudFlareChange passed in
func getCreateDNSRecordParam(cfc cloudFlareChange) cloudflare.CreateDNSRecordParams {
	return cloudflare.CreateDNSRecordParams{
		Name:    cfc.ResourceRecord.Name,
		TTL:     cfc.ResourceRecord.TTL,
		Proxied: cfc.ResourceRecord.Proxied,
		Type:    cfc.ResourceRecord.Type,
		Content: cfc.ResourceRecord.Content,
	}
}

// NewCloudFlareProvider initializes a new CloudFlare DNS based Provider.
func NewCloudFlareProvider(domainFilter endpoint.DomainFilter, zoneIDFilter provider.ZoneIDFilter, proxiedByDefault bool, dryRun bool, dnsRecordsPerPage int) (*CloudFlareProvider, error) {
	// initialize via chosen auth method and returns new API object
	var (
		config *cloudflare.API
		err    error
	)
	if os.Getenv("CF_API_TOKEN") != "" {
		token := os.Getenv("CF_API_TOKEN")
		if strings.HasPrefix(token, "file:") {
			tokenBytes, err := os.ReadFile(strings.TrimPrefix(token, "file:"))
			if err != nil {
				return nil, fmt.Errorf("failed to read CF_API_TOKEN from file: %w", err)
			}
			token = string(tokenBytes)
		}
		config, err = cloudflare.NewWithAPIToken(token)
	} else {
		config, err = cloudflare.New(os.Getenv("CF_API_KEY"), os.Getenv("CF_API_EMAIL"))
	}
	if err != nil {
		return nil, fmt.Errorf("failed to initialize cloudflare provider: %v", err)
	}
	tunnelID := os.Getenv("CF_TUNNEL_ID")
	if tunnelID == "" {
		return nil, fmt.Errorf("tunnelID is empty")
	}
	accountID := os.Getenv("CF_ACCOUNT_ID")
	if accountID == "" {
		return nil, fmt.Errorf("accountID is empty")
	}
	provider := &CloudFlareProvider{
		// Client: config,
		Client:            service{config},
		domainFilter:      domainFilter,
		zoneIDFilter:      zoneIDFilter,
		proxiedByDefault:  proxiedByDefault,
		DryRun:            dryRun,
		DNSRecordsPerPage: dnsRecordsPerPage,
		TunnelID:          tunnelID,
		AccountID:         accountID,
	}
	return provider, nil
}

// Zones returns the list of hosted zones.
func (p *CloudFlareProvider) Zones(ctx context.Context) ([]cloudflare.Zone, error) {
	result := []cloudflare.Zone{}

	// if there is a zoneIDfilter configured
	// && if the filter isn't just a blank string (used in tests)
	if len(p.zoneIDFilter.ZoneIDs) > 0 && p.zoneIDFilter.ZoneIDs[0] != "" {
		log.Debugln("zoneIDFilter configured. only looking up zone IDs defined")
		for _, zoneID := range p.zoneIDFilter.ZoneIDs {
			log.Debugf("looking up zone %s", zoneID)
			detailResponse, err := p.Client.ZoneDetails(ctx, zoneID)
			if err != nil {
				log.Errorf("zone %s lookup failed, %v", zoneID, err)
				return result, err
			}
			log.WithFields(log.Fields{
				"zoneName": detailResponse.Name,
				"zoneID":   detailResponse.ID,
			}).Debugln("adding zone for consideration")
			result = append(result, detailResponse)
		}
		return result, nil
	}

	log.Debugln("no zoneIDFilter configured, looking at all zones")

	zonesResponse, err := p.Client.ListZonesContext(ctx)
	if err != nil {
		return nil, err
	}

	for _, zone := range zonesResponse.Result {
		if !p.domainFilter.Match(zone.Name) {
			log.Debugf("zone %s not in domain filter", zone.Name)
			continue
		}
		result = append(result, zone)
	}

	return result, nil
}

// Records returns the list of records.
func (p *CloudFlareProvider) Records(ctx context.Context) ([]*endpoint.Endpoint, error) {
	zones, err := p.Zones(ctx)
	if err != nil {
		return nil, err
	}

	endpoints := []*endpoint.Endpoint{}
	for _, zone := range zones {
		records, err := p.listDNSRecordsWithAutoPagination(ctx, zone.ID)
		if err != nil {
			return nil, err
		}

		// As CloudFlare does not support "sets" of targets, but instead returns
		// a single entry for each name/type/target, we have to group by name
		// and record to allow the planner to calculate the correct plan. See #992.
		endpoints = append(endpoints, groupByNameAndType(records)...)
	}
	resourceContainer := cloudflare.AccountIdentifier(p.AccountID)
	tunnelConf, err := p.Client.GetTunnelConfiguration(ctx, resourceContainer, p.TunnelID)
	if err != nil {
		return nil, err
	}
	ingressTargets := make(map[string]string, 0)
	for _, ingress := range tunnelConf.Config.Ingress {
		if ingress.Hostname == "" {
			continue
		}
		target, err := p.extractTarget(ingress.Service)
		if err != nil {
			continue
		}
		ingressTargets[ingress.Hostname] = target
	}
	// If recordType is CNAME and target is tunnelTarget, treat it as A record
	for _, e := range endpoints {
		if e.RecordType != endpoint.RecordTypeCNAME {
			continue
		}
		for i, target := range e.Targets {
			if target == p.tunnelTarget() {
				e.Targets[i] = ingressTargets[e.DNSName]
				e.RecordType = endpoint.RecordTypeA
			}
		}
	}

	return endpoints, nil
}

// ApplyChanges applies a given set of changes in a given zone.
func (p *CloudFlareProvider) ApplyChanges(ctx context.Context, changes *plan.Changes) error {
	cloudflareChanges := []*cloudFlareChange{}

	for _, endpoint := range changes.Create {
		for _, target := range endpoint.Targets {
			cloudflareChanges = append(cloudflareChanges, p.newCloudFlareChange(cloudFlareCreate, endpoint, target))
		}
	}

	for i, desired := range changes.UpdateNew {
		current := changes.UpdateOld[i]

		add, remove, _ := provider.Difference(current.Targets, desired.Targets)

		for _, a := range remove {
			cloudflareChanges = append(cloudflareChanges, p.newCloudFlareChange(cloudFlareDelete, current, a))
		}

		for _, a := range add {
			cloudflareChanges = append(cloudflareChanges, p.newCloudFlareChange(cloudFlareCreate, desired, a))
		}
	}

	for _, endpoint := range changes.Delete {
		for _, target := range endpoint.Targets {
			cloudflareChanges = append(cloudflareChanges, p.newCloudFlareChange(cloudFlareDelete, endpoint, target))
		}
	}

	return p.submitChanges(ctx, cloudflareChanges)
}

// submitChanges takes a zone and a collection of Changes and sends them as a single transaction.
func (p *CloudFlareProvider) submitChanges(ctx context.Context, changes []*cloudFlareChange) error {
	// return early if there is nothing to change
	if len(changes) == 0 {
		log.Info("All records are already up to date")
		return nil
	}

	accountResourceContainer := cloudflare.AccountIdentifier(p.AccountID)
	oldConf, err := p.Client.GetTunnelConfiguration(ctx, accountResourceContainer, p.TunnelID)
	if err != nil {
		log.Errorf("failed to get tunnel configuration: %v", err)
		return err
	}
	newConf, err := p.updateTunnelConf(oldConf.Config, changes)
	if err != nil {
		return err
	}

	zones, err := p.Zones(ctx)

	// separate into per-zone change sets to be passed to the API.
	changesByZone := p.changesByZone(zones, changes)

	var failedZones []string
	for zoneID, changes := range changesByZone {
		records, err := p.listDNSRecordsWithAutoPagination(ctx, zoneID)
		if err != nil {
			return fmt.Errorf("could not fetch records from zone, %v", err)
		}

		filteredChanged := p.filteredChanges(changes, records, newConf.Ingress)
		var failedChange bool
		for _, change := range filteredChanged {
			logFields := log.Fields{
				"record": change.ResourceRecord.Name,
				"type":   change.ResourceRecord.Type,
				"ttl":    change.ResourceRecord.TTL,
				"action": change.Action,
				"zone":   zoneID,
			}

			log.WithFields(logFields).Info("Changing record.")

			if p.DryRun {
				continue
			}

			resourceContainer := cloudflare.ZoneIdentifier(zoneID)
			if change.Action == cloudFlareDelete {
				recordID := p.getRecordID(records, change.ResourceRecord)
				if recordID == "" {
					log.WithFields(logFields).Errorf("failed to find previous record: %v", change.ResourceRecord)
					continue
				}
				err := p.Client.DeleteDNSRecord(ctx, resourceContainer, recordID)
				if err != nil {
					failedChange = true
					log.WithFields(logFields).Errorf("failed to delete record: %v", err)
				}
			} else if change.Action == cloudFlareCreate {
				recordParam := getCreateDNSRecordParam(*change)
				_, err := p.Client.CreateDNSRecord(ctx, resourceContainer, recordParam)
				if err != nil {
					failedChange = true
					log.WithFields(logFields).Errorf("failed to create record: %v", err)
				}
			}
		}

		if failedChange {
			failedZones = append(failedZones, zoneID)
		}
	}

	if len(failedZones) > 0 {
		return fmt.Errorf("failed to submit all changes for the following zones: %v", failedZones)
	}

	confParam := cloudflare.TunnelConfigurationParams{
		TunnelID: p.TunnelID,
		Config:   newConf,
	}
	log.Infof("start change tunnel configuration. before: %+v, after: %+v", oldConf.Config.Ingress, newConf.Ingress)
	_, err = p.Client.UpdateTunnelConfiguration(ctx, accountResourceContainer, confParam)
	if err != nil {
		log.Errorf("failed to update tunnel configuration: %v", err)
		return err
	}

	return nil
}

// AdjustEndpoints modifies the endpoints as needed by the specific provider
func (p *CloudFlareProvider) AdjustEndpoints(endpoints []*endpoint.Endpoint) ([]*endpoint.Endpoint, error) {
	adjustedEndpoints := []*endpoint.Endpoint{}
	for _, e := range endpoints {
		proxied := shouldBeProxied(e, p.proxiedByDefault)
		if proxied {
			e.RecordTTL = 0
		}
		e.SetProviderSpecificProperty(source.CloudflareProxiedKey, strconv.FormatBool(proxied))

		adjustedEndpoints = append(adjustedEndpoints, e)
	}
	return adjustedEndpoints, nil
}

// changesByZone separates a multi-zone change into a single change per zone.
func (p *CloudFlareProvider) changesByZone(zones []cloudflare.Zone, changeSet []*cloudFlareChange) map[string][]*cloudFlareChange {
	changes := make(map[string][]*cloudFlareChange)
	zoneNameIDMapper := provider.ZoneIDName{}

	for _, z := range zones {
		zoneNameIDMapper.Add(z.ID, z.Name)
		changes[z.ID] = []*cloudFlareChange{}
	}

	for _, c := range changeSet {
		zoneID, _ := zoneNameIDMapper.FindZone(c.ResourceRecord.Name)
		if zoneID == "" {
			log.Debugf("Skipping record %s because no hosted zone matching record DNS Name was detected", c.ResourceRecord.Name)
			continue
		}
		changes[zoneID] = append(changes[zoneID], c)
	}

	return changes
}

func (p *CloudFlareProvider) updateTunnelConf(oldConf cloudflare.TunnelConfiguration, changes []*cloudFlareChange) (cloudflare.TunnelConfiguration, error) {
	log.Info("Changes: ")
	for _, change := range changes {
		log.Infof("Change: %+v", change)
	}
	oldTargets := make(map[string]string, 0)
	for _, ingress := range oldConf.Ingress {
		if ingress.Hostname == "" {
			continue
		}
		target, err := p.extractTarget(ingress.Service)
		if err != nil {
			continue
		}
		oldTargets[ingress.Hostname] = target
	}
	ingresses := make([]cloudflare.UnvalidatedIngressRule, 0, len(oldTargets))
	var catchAll cloudflare.UnvalidatedIngressRule
	for _, rule := range oldConf.Ingress {
		if rule.Hostname == "" {
			catchAll = rule
			continue
		}
		ingresses = append(ingresses, rule)
	}

	for _, change := range changes {
		if change.ResourceRecord.Type != endpoint.RecordTypeA {
			continue
		}
		if change.Action == cloudFlareCreate {
			ingresses = append(ingresses, newIngress(*change))
		} else if change.Action == cloudFlareDelete {
			changeWithContent := *change
			changeWithContent.ResourceRecord.Content = oldTargets[change.ResourceRecord.Name]
			ingressIdx, err := p.indexOfIngress(ingresses, newIngress(changeWithContent))
			if err != nil {
				log.Errorf("failed to find tunnel ingress: %v", err)
				return oldConf, err
			}
			ingresses = append(ingresses[:ingressIdx], ingresses[ingressIdx+1:]...)
		}
	}

	ingresses = append(ingresses, catchAll)
	newConf := oldConf
	newConf.Ingress = ingresses
	return newConf, nil
}

func (p *CloudFlareProvider) filteredChanges(changes []*cloudFlareChange, currentRecords []cloudflare.DNSRecord, newIngress []cloudflare.UnvalidatedIngressRule) []*cloudFlareChange {
	filteredChanges := make([]*cloudFlareChange, 0)
	tunnelCreations := make([]string, 0)
	tunnelDeletions := make([]string, 0)
	for _, change := range changes {
		if change.ResourceRecord.Type != endpoint.RecordTypeA {
			filteredChanges = append(filteredChanges, change)
			continue
		}
		if change.Action == cloudFlareCreate {
			tunnelCreations = append(tunnelCreations, change.ResourceRecord.Name)
		} else if change.Action == cloudFlareDelete {
			tunnelDeletions = append(tunnelDeletions, change.ResourceRecord.Name)
		}
	}

	add, remove, _ := provider.Difference(tunnelDeletions, tunnelCreations)
	for _, dnsName := range add {
		filteredChanges = append(filteredChanges, &cloudFlareChange{
			Action: cloudFlareCreate,
			ResourceRecord: cloudflare.DNSRecord{
				Name:    dnsName,
				TTL:     defaultCloudFlareRecordTTL,
				Proxied: proxyEnabled,
				Type:    endpoint.RecordTypeCNAME,
				Content: p.tunnelTarget(),
			},
		})
	}
	for _, dnsName := range remove {
		filteredChanges = append(filteredChanges, &cloudFlareChange{
			Action: cloudFlareDelete,
			ResourceRecord: cloudflare.DNSRecord{
				Name:    dnsName,
				Type:    endpoint.RecordTypeCNAME,
				Content: p.tunnelTarget(),
			},
		})
	}

	return filteredChanges
}

func (p *CloudFlareProvider) getRecordID(records []cloudflare.DNSRecord, record cloudflare.DNSRecord) string {
	for _, zoneRecord := range records {
		if zoneRecord.Name == record.Name && zoneRecord.Type == record.Type && zoneRecord.Content == record.Content {
			return zoneRecord.ID
		}
	}
	return ""
}

func (p *CloudFlareProvider) newCloudFlareChange(action string, endpoint *endpoint.Endpoint, target string) *cloudFlareChange {
	ttl := defaultCloudFlareRecordTTL
	proxied := shouldBeProxied(endpoint, p.proxiedByDefault)

	if endpoint.RecordTTL.IsConfigured() {
		ttl = int(endpoint.RecordTTL)
	}

	return &cloudFlareChange{
		Action: action,
		ResourceRecord: cloudflare.DNSRecord{
			Name:    endpoint.DNSName,
			TTL:     ttl,
			Proxied: &proxied,
			Type:    endpoint.RecordType,
			Content: target,
		},
	}
}

func newIngress(change cloudFlareChange) cloudflare.UnvalidatedIngressRule {
	return cloudflare.UnvalidatedIngressRule{
		Hostname:      change.ResourceRecord.Name,
		Path:          "",
		Service:       toHttps(change.ResourceRecord.Content),
		OriginRequest: defaultOriginRequest,
	}
}

func (p *CloudFlareProvider) indexOfIngress(ingresses []cloudflare.UnvalidatedIngressRule, ingress cloudflare.UnvalidatedIngressRule) (int, error) {
	for i, item := range ingresses {
		if item.Hostname == ingress.Hostname && item.Service == ingress.Service {
			return i, nil
		}
	}
	return 0, fmt.Errorf("ingress not found. ingresses: %+v, ingress: %+v", ingresses, ingress)
}

func (p *CloudFlareProvider) tunnelTarget() string {
	return fmt.Sprintf("%s.cfargotunnel.com", p.TunnelID)
}

func (p *CloudFlareProvider) extractTarget(cfService string) (string, error) {
	pattern := `(([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+)|localhost`
	re, err := regexp.Compile(pattern)
	if err != nil {
		return "", err
	}
	match := re.FindString(cfService)
	if match == "" {
		return "", fmt.Errorf("there is no match. regexp: %s, cfService: %s", pattern, cfService)
	}
	return match, nil
}

// listDNSRecords performs automatic pagination of results on requests to cloudflare.ListDNSRecords with custom per_page values
func (p *CloudFlareProvider) listDNSRecordsWithAutoPagination(ctx context.Context, zoneID string) ([]cloudflare.DNSRecord, error) {
	var records []cloudflare.DNSRecord
	resultInfo := cloudflare.ResultInfo{PerPage: p.DNSRecordsPerPage, Page: 1}
	params := cloudflare.ListDNSRecordsParams{ResultInfo: resultInfo}
	for {
		pageRecords, resultInfo, err := p.Client.ListDNSRecords(ctx, cloudflare.ZoneIdentifier(zoneID), params)
		if err != nil {
			return nil, err
		}

		records = append(records, pageRecords...)
		params.ResultInfo = resultInfo.Next()
		if params.ResultInfo.Done() {
			break
		}
	}
	return records, nil
}

func shouldBeProxied(endpoint *endpoint.Endpoint, proxiedByDefault bool) bool {
	proxied := proxiedByDefault

	for _, v := range endpoint.ProviderSpecific {
		if v.Name == source.CloudflareProxiedKey {
			b, err := strconv.ParseBool(v.Value)
			if err != nil {
				log.Errorf("Failed to parse annotation [%s]: %v", source.CloudflareProxiedKey, err)
			} else {
				proxied = b
			}
			break
		}
	}

	if recordTypeProxyNotSupported[endpoint.RecordType] {
		proxied = false
	}
	return proxied
}

func toHttps(address string) string {
	return fmt.Sprintf("https://%s:443", address)
}

func groupByNameAndType(records []cloudflare.DNSRecord) []*endpoint.Endpoint {
	endpoints := []*endpoint.Endpoint{}

	// group supported records by name and type
	groups := map[string][]cloudflare.DNSRecord{}

	for _, r := range records {
		if !provider.SupportedRecordType(r.Type) {
			continue
		}

		groupBy := r.Name + r.Type
		if _, ok := groups[groupBy]; !ok {
			groups[groupBy] = []cloudflare.DNSRecord{}
		}

		groups[groupBy] = append(groups[groupBy], r)
	}

	// create single endpoint with all the targets for each name/type
	for _, records := range groups {
		targets := make([]string, len(records))
		for i, record := range records {
			targets[i] = record.Content
		}
		endpoints = append(endpoints,
			endpoint.NewEndpointWithTTL(
				records[0].Name,
				records[0].Type,
				endpoint.TTL(records[0].TTL),
				targets...).
				WithProviderSpecific(source.CloudflareProxiedKey, strconv.FormatBool(*records[0].Proxied)),
		)
	}

	return endpoints
}

// boolPtr is used as a helper function to return a pointer to a boolean
// Needed because some parameters require a pointer.
func boolPtr(b bool) *bool {
	return &b
}


```

</details>

主要な部分について説明していきます。

`Records`  
現在登録されている DNS Record 一覧を返す関数です。これの返り値と、期待する DNS の状態の差分をもとに変更処理が走ります。
基本的には cloudflareDNS のレコードをそのまま返せばいいのですが、例外として、RecordType が CNAME で、かつ Content が`{TUNNEL_ID}.cfargotunnel.com`のものは cloudflare tunnel に登録された DNS に対応しているため、A レコードに変換する処理を施しています。

`submitChanges`  
変更を実際に適用する部分になります。この関数内では次の 2 点をする必要があります。

- A レコードへの変更に応じて、cloudflare tunnel の設定を変更
- cloudflareDNS を変更

(cloudflareDNS を変更する際には、A レコードは cloudflare tunnel への CNAME へと変換して追加をする必要があることに注意します。)

1 点目については、`updateTunnelConf`で対応しています。`updateTunnelConf`では、A レコードに対する作成/削除の処理を、`cloudflare.TunnelConfiguration.Ingress`に対して適用することで変更を施しています。

2 点目については、基本的に`cloudflare/cloudflare.go`に書いてあった通りでいいのですが、A レコードに対しては注意する必要があります。今回、A レコードはすべて cloudflare tunnel で対応するため、A レコードは cloudflare tunnel への CNAME に変換する必要があります。また、同じレコードを一度の処理の中で追加したり削除したりすると不具合を起こすことがあるため、作成・削除の両方が伴うレコードに対しては変更処理を行わないようにフィルタリングしています。(`filterChanges`)

## 最後に

今回は kubernetes 上で立てたエンドポイントへの DNS が cloudflare tunnel で自動的に作成されるようにしました。OSS を fork して自分なりに加工して使うという経験は何気に初めてだったので、いい経験になりました。
次回は staging 環境が自動生成される仕組みを作っていきたいと思います。

## 参考資料

https://developers.cloudflare.com/api

https://github.com/kubernetes-sigs/external-dns
