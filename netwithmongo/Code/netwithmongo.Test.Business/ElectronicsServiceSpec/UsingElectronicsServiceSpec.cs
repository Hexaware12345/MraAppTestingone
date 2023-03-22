using NSubstitute;
using netwithmongo.Test.Framework;
using netwithmongo.BusinessServices.Services;
using netwithmongo.Data.Interfaces;

namespace netwithmongo.Test.Business.ElectronicsServiceSpec
{
    public abstract class UsingElectronicsServiceSpec : SpecFor<ElectronicsService>
    {
        protected IElectronicsRepository _electronicsRepository;

        public override void Context()
        {
            _electronicsRepository = Substitute.For<IElectronicsRepository>();
            subject = new ElectronicsService(_electronicsRepository);

        }

    }
}