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
    public class CosmeticsRepository : ICosmeticsRepository
    {
        private IGateway _gateway;
        private string _collectionName = "Cosmetics";

        public CosmeticsRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Cosmetics> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Cosmetics>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public Cosmetics Get(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Cosmetics>(_collectionName)
                            .Find(x => x.Id == id).Single();
            return result;
        }

        public bool Save(Cosmetics entity)
        {
            _gateway.GetMongoDB().GetCollection<Cosmetics>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Cosmetics Update(string id, Cosmetics entity)
        {
            var update = Builders<Cosmetics>.Update
                .Set(e => e.Productname, entity.Productname )
                .Set(e => e.Description, entity.Description )
                .Set(e => e.Price, entity.Price );

            var result = _gateway.GetMongoDB().GetCollection<Cosmetics>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Cosmetics>(_collectionName)
                         .FindOneAndDelete(e => e.Id == id);
            if(result==null) return false;             
            return true;
        }
    }
}
