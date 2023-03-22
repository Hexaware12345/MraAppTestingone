using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace netwithmongo.BusinessEntities.Entities
{
    [BsonIgnoreExtraElements]
    public class Electronics
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id  { get; set; }
        public string Productname  { get; set; }
        public string Description  { get; set; }
        public bool Offer  { get; set; }
        public int Price  { get; set; }
        public int Deliverydate  { get; set; }
        
    }

}
