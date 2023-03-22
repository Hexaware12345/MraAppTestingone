using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using netwithmongo.BusinessEntities.Entities;

namespace netwithmongo.Test.Business.ElectronicsServiceSpec
{
    public class When_saving_electronics : UsingElectronicsServiceSpec
    {
        private Electronics _result;

        private Electronics _electronics;

        public override void Context()
        {
            base.Context();

            _electronics = new Electronics
            {
                Productname = "Productname",
                Description = "Description",
                Offer = true,
                Price = 87,
                Deliverydate = 59
            };

            _electronicsRepository.Save(_electronics).Returns(true);
        }
        public override void Because()
        {
            _result = subject.Save(_electronics);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _electronicsRepository.Received(1).Save(_electronics);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Electronics>();

            _result.ShouldBe(_electronics);
        }
    }
}