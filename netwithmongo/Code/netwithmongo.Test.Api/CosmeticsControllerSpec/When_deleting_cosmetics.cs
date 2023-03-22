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
    public class When_deleting_cosmetics : UsingCosmeticsControllerSpec
    {
        private ActionResult<bool> _result;

        private string Id = "Khfhuihd";

        public override void Context()
        {
            base.Context();

            _cosmeticsService.Delete(Id).Returns(true);
        }
        public override void Because()
        {
            _result = subject.Delete(Id);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _cosmeticsService.Received(1).Delete(Id);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<bool>();

            var resultList = (bool)resultListObject;

            resultList.ShouldBe(true);
        }
    }
}