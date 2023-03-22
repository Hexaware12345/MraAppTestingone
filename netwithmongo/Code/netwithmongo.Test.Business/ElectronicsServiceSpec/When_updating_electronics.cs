using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using netwithmongo.BusinessEntities.Entities;


namespace netwithmongo.Test.Business.ElectronicsServiceSpec
{
    public class When_updating_electronics : UsingElectronicsServiceSpec
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
                Offer = false,
                Price = 8,
                Deliverydate = 22
            };

            _electronicsRepository.Update(_electronics.Id, _electronics).Returns(_electronics);
            
        }
        public override void Because()
        {
            _result = subject.Update(_electronics.Id, _electronics);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _electronicsRepository.Received(1).Update(_electronics.Id, _electronics);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Electronics>();

            _result.ShouldBe(_electronics);
        }
    }
}