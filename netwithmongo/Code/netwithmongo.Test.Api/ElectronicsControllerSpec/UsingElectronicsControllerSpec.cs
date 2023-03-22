using NSubstitute;
using netwithmongo.Test.Framework;
using netwithmongo.Api.Controllers;
using netwithmongo.BusinessServices.Interfaces;
using AutoMapper;
using netwithmongo.BusinessEntities.Entities;
using netwithmongo.Contracts.DTO;


namespace netwithmongo.Test.Api.ElectronicsControllerSpec
{
    public abstract class UsingElectronicsControllerSpec : SpecFor<ElectronicsController>
    {
        protected IElectronicsService _electronicsService;
        protected IMapper _mapper;

        public override void Context()
        {
            _electronicsService = Substitute.For<IElectronicsService>();
            _mapper = Substitute.For<IMapper>();
            subject = new ElectronicsController(_electronicsService,_mapper);

        }

    }
}
