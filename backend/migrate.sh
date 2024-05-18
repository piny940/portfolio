for file in $(ls db/migrations/*.sql | sort -n); do
  echo $file
done
