using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using netwithmongo.BusinessEntities.Entities;
using netwithmongo.Contracts.DTO;

namespace netwithmongo.Test.Api.ElectronicsControllerSpec
{
    public class When_getting_all_electronics : UsingElectronicsControllerSpec
    {
        private ActionResult<IEnumerable<ElectronicsDto>> _result;

        private IEnumerable<Electronics> _all_electronics;
        private Electronics _electronics;

        private IEnumerable<ElectronicsDto>  _all_electronicsDto;
        private ElectronicsDto _electronicsDto;
    

        public override void Context()
        {
            base.Context();

            _electronics = new Electronics{
                Productname = "Productname",
                Description = "Description",
                Offer = true,
                Price = 77,
                Deliverydate = 77
            };

            _electronicsDto = new ElectronicsDto{
                    Productname = "Productname",
                    Description = "Description",
                    Offer = false,
                    Price = 15,
                    Deliverydate = 59
                };

            _all_electronics = new List<Electronics> { _electronics};
            _electronicsService.GetAll().Returns(_all_electronics);
            _all_electronicsDto  = new List<ElectronicsDto> {_electronicsDto};
            _mapper.Map<IEnumerable<ElectronicsDto>>(_all_electronics).Returns( _all_electronicsDto);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _electronicsService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<ElectronicsDto>>();

            List<ElectronicsDto> resultList = resultListObject as List<ElectronicsDto>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_electronicsDto);
        }
    }
}