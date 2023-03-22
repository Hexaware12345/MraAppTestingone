using netwithmongo.Data.Interfaces;
using netwithmongo.BusinessEntities.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Bindings;
using System;
using System.Collections.Generic;
using System.Text;

namespace netwithmongo.Data.Repositories
{
    public class ElectronicsRepository : IElectronicsRepository
    {
        private IGateway _gateway;
        private string _collectionName = "Electronics";

        public ElectronicsRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Electronics> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Electronics>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public Electronics Get(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Electronics>(_collectionName)
                            .Find(x => x.Id == id).Single();
            return result;
        }

        public bool Save(Electronics entity)
        {
            _gateway.GetMongoDB().GetCollection<Electronics>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Electronics Update(string id, Electronics entity)
        {
            var update = Builders<Electronics>.Update
                .Set(e => e.Productname, entity.Productname )
                .Set(e => e.Description, entity.Description )
                .Set(e => e.Offer, entity.Offer )
                .Set(e => e.Price, entity.Price )
                .Set(e => e.Deliverydate, entity.Deliverydate );

            var result = _gateway.GetMongoDB().GetCollection<Electronics>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Electronics>(_collectionName)
                         .FindOneAndDelete(e => e.Id == id);
            if(result==null) return false;             
            return true;
        }
    }
}
