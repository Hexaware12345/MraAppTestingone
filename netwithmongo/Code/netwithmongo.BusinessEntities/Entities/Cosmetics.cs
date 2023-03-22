using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace netwithmongo.BusinessEntities.Entities
{
    [BsonIgnoreExtraElements]
    public class Cosmetics
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id  { get; set; }
        public string Productname  { get; set; }
        public string Description  { get; set; }
        public int Price  { get; set; }
        
    }

}
