using netwithmongo.BusinessServices.Interfaces;
using netwithmongo.Data.Interfaces;
using netwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace netwithmongo.BusinessServices.Services
{
    public class CosmeticsService : ICosmeticsService
    {
        ICosmeticsRepository _CosmeticsRepository;

        public CosmeticsService(ICosmeticsRepository CosmeticsRepository)
        {
           this._CosmeticsRepository = CosmeticsRepository;
        }
        public IEnumerable<Cosmetics> GetAll()
        {
            return _CosmeticsRepository.GetAll();
        }

        public Cosmetics Get(string id)
        {
            return _CosmeticsRepository.Get(id);
        }

        public Cosmetics Save(Cosmetics Cosmetics)
        {
            _CosmeticsRepository.Save(Cosmetics);
            return Cosmetics;
        }

        public Cosmetics Update(string id, Cosmetics Cosmetics)
        {
            return _CosmeticsRepository.Update(id, Cosmetics);
        }

        public bool Delete(string id)
        {
            return _CosmeticsRepository.Delete(id);
        }

    }
}
