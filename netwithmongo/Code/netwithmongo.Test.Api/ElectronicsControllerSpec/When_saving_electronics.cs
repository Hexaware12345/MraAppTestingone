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

namespace netwithmongo.Test.Api.ElectronicsControllerSpec
{
    public class When_saving_electronics : UsingElectronicsControllerSpec
    {
        private ActionResult<ElectronicsDto> _result;

        private Electronics _electronics;
        private ElectronicsDto _electronicsDto;

        public override void Context()
        {
            base.Context();

            _electronics = new Electronics
            {
                Productname = "Productname",
                Description = "Description",
                Offer = true,
                Price = 53,
                Deliverydate = 10
            };

            _electronicsDto = new ElectronicsDto{
                    Productname = "Productname",
                    Description = "Description",
                    Offer = false,
                    Price = 84,
                    Deliverydate = 82
            };

            _electronicsService.Save(_electronics).Returns(_electronics);
            _mapper.Map<ElectronicsDto>(_electronics).Returns(_electronicsDto);
        }
        public override void Because()
        {
            _result = subject.Save(_electronics);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _electronicsService.Received(1).Save(_electronics);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<ElectronicsDto>();

            var resultList = (ElectronicsDto)resultListObject;

            resultList.ShouldBe(_electronicsDto);
        }
    }
}

