using NSubstitute;
using netwithmongo.Test.Framework;
using netwithmongo.BusinessServices.Services;
using netwithmongo.Data.Interfaces;

namespace netwithmongo.Test.Business.CosmeticsServiceSpec
{
    public abstract class UsingCosmeticsServiceSpec : SpecFor<CosmeticsService>
    {
        protected ICosmeticsRepository _cosmeticsRepository;

        public override void Context()
        {
            _cosmeticsRepository = Substitute.For<ICosmeticsRepository>();
            subject = new CosmeticsService(_cosmeticsRepository);

        }

    }
}