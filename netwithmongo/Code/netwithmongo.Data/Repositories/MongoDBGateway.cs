using netwithmongo.Data.Interfaces;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.Core.Extensions.DiagnosticSources;
using System;

namespace netwithmongo.Data.Repositories
{
    public class MongoDBGateway : IGateway
    {
        private IConfiguration _configuration;
        public MongoDBGateway(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IMongoDatabase GetMongoDB()
        {
           string connectionString = _configuration.GetSection("MongoDb")["connectionString"];
            string database = _configuration.GetSection("MongoDb")["Database"];
            MongoClient client;
            if (_configuration["OpenTelemetry:isEnabled"] == "true")
            {
                var clientSettings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
                clientSettings.ClusterConfigurator = cb => cb.Subscribe(new DiagnosticsActivityEventSubscriber());
                client = new MongoClient(clientSettings); 
            }
           else
           {
               client = new MongoClient(connectionString);
           }
            return client.GetDatabase(database);

        }
    }
}
