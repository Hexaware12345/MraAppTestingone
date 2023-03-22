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
    public class When_updating_electronics : UsingElectronicsControllerSpec
    {
        private ActionResult<ElectronicsDto > _result;
        private Electronics _electronics;
        private ElectronicsDto _electronicsDto;

        public override void Context()
        {
            base.Context();

            _electronics = new Electronics
            {
                Productname = "Productname",
                Description = "Description",
                Offer = false,
                Price = 14,
                Deliverydate = 98
            };

            _electronicsDto = new ElectronicsDto{
                    Productname = "Productname",
                    Description = "Description",
                    Offer = false,
                    Price = 63,
                    Deliverydate = 76
            };

            _electronicsService.Update(_electronics.Id, _electronics).Returns(_electronics);
            _mapper.Map<ElectronicsDto>(_electronics).Returns(_electronicsDto);
            
        }
        public override void Because()
        {
            _result = subject.Update(_electronics.Id, _electronics);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _electronicsService.Received(1).Update(_electronics.Id, _electronics);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<ElectronicsDto>();

            var resultList = resultListObject as ElectronicsDto;

            resultList.ShouldBe(_electronicsDto);
        }
    }
}