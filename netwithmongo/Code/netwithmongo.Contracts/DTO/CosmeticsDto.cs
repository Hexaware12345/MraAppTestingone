using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes; 
using System.Runtime.Serialization; 
namespace netwithmongo.Contracts.DTO {
   public class CosmeticsDto { 
     public string Id { get; set; }
        public string Productname { get; set; } 
        public string Description { get; set; } 
        public int Price { get; set; } 
} 
}
