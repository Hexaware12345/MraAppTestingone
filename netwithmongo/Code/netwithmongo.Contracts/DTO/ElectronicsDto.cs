using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes; 
using System.Runtime.Serialization; 
namespace netwithmongo.Contracts.DTO {
   public class ElectronicsDto { 
     public string Id { get; set; }
        public string Productname { get; set; } 
        public string Description { get; set; } 
        public bool Offer { get; set; } 
        public int Price { get; set; } 
        public int Deliverydate { get; set; } 
} 
}
