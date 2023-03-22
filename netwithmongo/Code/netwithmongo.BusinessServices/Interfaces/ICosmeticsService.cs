using netwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace netwithmongo.BusinessServices.Interfaces
{
    public interface ICosmeticsService
    {      
        IEnumerable<Cosmetics> GetAll();
        Cosmetics Get(string id);
        Cosmetics Save(Cosmetics classification);
        Cosmetics Update(string id, Cosmetics classification);
        bool Delete(string id);

    }
}
