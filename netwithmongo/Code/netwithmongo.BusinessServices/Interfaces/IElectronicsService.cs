using netwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace netwithmongo.BusinessServices.Interfaces
{
    public interface IElectronicsService
    {      
        IEnumerable<Electronics> GetAll();
        Electronics Get(string id);
        Electronics Save(Electronics classification);
        Electronics Update(string id, Electronics classification);
        bool Delete(string id);

    }
}
