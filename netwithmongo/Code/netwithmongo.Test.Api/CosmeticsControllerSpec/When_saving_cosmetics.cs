using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using netwithmongo.BusinessEntities.Entities;
using netwithmongo.Contracts.DTO;
using netwithmongo.BusinessServices.Services;

namespace netwithmongo.Test.Api.CosmeticsControllerSpec
{
    public class When_saving_cosmetics : UsingCosmeticsControllerSpec
    {
        private ActionResult<CosmeticsDto> _result;

        private Cosmetics _cosmetics;
        private CosmeticsDto _cosmeticsDto;

        public override void Context()
        {
            base.Context();

            _cosmetics = new Cosmetics
            {
                Productname = "Productname",
                Description = "Description",
                Price = 69
            };

            _cosmeticsDto = new CosmeticsDto{
                    Productname = "Productname",
                    Description = "Description",
                    Price = 84
            };

            _cosmeticsService.Save(_cosmetics).Returns(_cosmetics);
            _mapper.Map<CosmeticsDto>(_cosmetics).Returns(_cosmeticsDto);
        }
        public override void Because()
        {
            _result = subject.Save(_cosmetics);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _cosmeticsService.Received(1).Save(_cosmetics);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<CosmeticsDto>();

            var resultList = (CosmeticsDto)resultListObject;

            resultList.ShouldBe(_cosmeticsDto);
        }
    }
}

