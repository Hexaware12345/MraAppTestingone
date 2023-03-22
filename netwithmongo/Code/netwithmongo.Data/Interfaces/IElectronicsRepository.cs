using netwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace netwithmongo.Data.Interfaces
{
    public interface IElectronicsRepository : IGetAll<Electronics>,IGet<Electronics,string>, ISave<Electronics>, IUpdate<Electronics, string>, IDelete<string>
    {
    }
}
