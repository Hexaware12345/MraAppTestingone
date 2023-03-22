using netwithmongo.BusinessServices.Interfaces;
using netwithmongo.Data.Interfaces;
using netwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace netwithmongo.BusinessServices.Services
{
    public class ElectronicsService : IElectronicsService
    {
        IElectronicsRepository _ElectronicsRepository;

        public ElectronicsService(IElectronicsRepository ElectronicsRepository)
        {
           this._ElectronicsRepository = ElectronicsRepository;
        }
        public IEnumerable<Electronics> GetAll()
        {
            return _ElectronicsRepository.GetAll();
        }

        public Electronics Get(string id)
        {
            return _ElectronicsRepository.Get(id);
        }

        public Electronics Save(Electronics Electronics)
        {
            _ElectronicsRepository.Save(Electronics);
            return Electronics;
        }

        public Electronics Update(string id, Electronics Electronics)
        {
            return _ElectronicsRepository.Update(id, Electronics);
        }

        public bool Delete(string id)
        {
            return _ElectronicsRepository.Delete(id);
        }

    }
}
