using NSubstitute;
using netwithmongo.Test.Framework;
using netwithmongo.Api.Controllers;
using netwithmongo.BusinessServices.Interfaces;
using AutoMapper;
using netwithmongo.BusinessEntities.Entities;
using netwithmongo.Contracts.DTO;


namespace netwithmongo.Test.Api.CosmeticsControllerSpec
{
    public abstract class UsingCosmeticsControllerSpec : SpecFor<CosmeticsController>
    {
        protected ICosmeticsService _cosmeticsService;
        protected IMapper _mapper;

        public override void Context()
        {
            _cosmeticsService = Substitute.For<ICosmeticsService>();
            _mapper = Substitute.For<IMapper>();
            subject = new CosmeticsController(_cosmeticsService,_mapper);

        }

    }
}
