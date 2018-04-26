# Transportiert

### Deploy:
Um die App auf Gcloud bereitszustellen folgenden Befehl ausführen nachdem gcloud initzialisiert.
``
gcloud app deploy
``

### Database:
Mongo DB läuft als Cluster in Frankfurt. Verbinde mit:
```
URL: mongodb://demouser:<PASSWORD>@demotrans-shard-00-00-qdhwv.mongodb.net:27017,demotrans-shard-00-01-qdhwv.mongodb.net:27017,demotrans-shard-00-02-qdhwv.mongodb.net:27017/test?ssl=true&replicaSet=demotrans-shard-0&authSource=admin
User: demouser
Pw: zyPgthlmoGmmuJed
```

### Images Store:
https://cloud.google.com/storage/docs/creating-buckets