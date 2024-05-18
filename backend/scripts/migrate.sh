# オプション解析
args=$(getopt e: $*) || exit 1
set -- $args
while [ -n "$1" ]; do
  case $1 in
    -e) ENV=$2; shift 2 ;;
    --) shift; break ;;
    *) echo "Usage: cmd [-e environment]"; exit 1;;
  esac
done

# デフォルトの環境はdevelopment
if [ -z $ENV ]; then
  ENV="development"
fi

# production環境でない場合は.envファイルを読み込む
if [ $ENV != "production" ] && [ -e ".env.$ENV" ]; then
  echo "Load .env.$ENV"
  source .env.$ENV
fi
echo "ENV: $ENV"

cmd=""
for file in $(ls scripts/migrations/*.sql | sort -n); do
  cmd="$cmd \i $file"
done

echo $cmd | PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT