using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using netwithmongo.BusinessEntities.Entities;

namespace netwithmongo.Test.Business.ElectronicsServiceSpec
{
    public class When_getting_all_electronics : UsingElectronicsServiceSpec
    {
        private IEnumerable<Electronics> _result;

        private IEnumerable<Electronics> _all_electronics;
        private Electronics _electronics;

        public override void Context()
        {
            base.Context();

            _electronics = new Electronics{
                Productname = "Productname",
                Description = "Description",
                Offer = false,
                Price = 69,
                Deliverydate = 15
            };

            _all_electronics = new List<Electronics> { _electronics};
            _electronicsRepository.GetAll().Returns(_all_electronics);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _electronicsRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<Electronics>>();

            List<Electronics> resultList = _result as List<Electronics>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_electronics);
        }
    }
}