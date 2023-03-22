using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using netwithmongo.BusinessEntities.Entities;
using netwithmongo.Contracts.DTO;

namespace netwithmongo.Test.Api.CosmeticsControllerSpec
{
    public class When_getting_all_cosmetics : UsingCosmeticsControllerSpec
    {
        private ActionResult<IEnumerable<CosmeticsDto>> _result;

        private IEnumerable<Cosmetics> _all_cosmetics;
        private Cosmetics _cosmetics;

        private IEnumerable<CosmeticsDto>  _all_cosmeticsDto;
        private CosmeticsDto _cosmeticsDto;
    

        public override void Context()
        {
            base.Context();

            _cosmetics = new Cosmetics{
                Productname = "Productname",
                Description = "Description",
                Price = 97
            };

            _cosmeticsDto = new CosmeticsDto{
                    Productname = "Productname",
                    Description = "Description",
                    Price = 2
                };

            _all_cosmetics = new List<Cosmetics> { _cosmetics};
            _cosmeticsService.GetAll().Returns(_all_cosmetics);
            _all_cosmeticsDto  = new List<CosmeticsDto> {_cosmeticsDto};
            _mapper.Map<IEnumerable<CosmeticsDto>>(_all_cosmetics).Returns( _all_cosmeticsDto);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _cosmeticsService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<CosmeticsDto>>();

            List<CosmeticsDto> resultList = resultListObject as List<CosmeticsDto>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_cosmeticsDto);
        }
    }
}