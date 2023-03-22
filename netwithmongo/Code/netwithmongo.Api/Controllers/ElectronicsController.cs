using System.Collections.Generic;
using netwithmongo.BusinessServices.Interfaces;
using netwithmongo.BusinessEntities.Entities;
using netwithmongo.Contracts.DTO;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace netwithmongo.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ElectronicsController : ControllerBase
    {
        IElectronicsService _ElectronicsService;
        private readonly IMapper _mapper;
        public ElectronicsController(IElectronicsService ElectronicsService,IMapper mapper)
        {
            _ElectronicsService = ElectronicsService;
            _mapper = mapper;
        }

        // GET: api/Electronics
        [HttpGet]
        public ActionResult<IEnumerable<ElectronicsDto>> Get()
        {
            var ElectronicsDTOs = _mapper.Map<IEnumerable<ElectronicsDto>>(_ElectronicsService.GetAll());
            return Ok(ElectronicsDTOs);
        }

        [HttpGet("{id}")]
        public ActionResult<ElectronicsDto> GetById(string id)
        {
            var ElectronicsDTO = _mapper.Map<ElectronicsDto>(_ElectronicsService.Get(id));
            return Ok(ElectronicsDTO);
        }

        [HttpPost]
        public ActionResult<ElectronicsDto> Save(Electronics Electronics)
        {
            var ElectronicsDTOs = _mapper.Map<ElectronicsDto>(_ElectronicsService.Save(Electronics));
            return Ok(ElectronicsDTOs);
        }

        [HttpPut("{id}")]
        public ActionResult<ElectronicsDto> Update([FromRoute] string id, Electronics Electronics)
        {
            var ElectronicsDTOs = _mapper.Map<ElectronicsDto>(_ElectronicsService.Update(id, Electronics));
            return Ok(ElectronicsDTOs);
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            bool res = _ElectronicsService.Delete(id);
            if(res== false) return null;
            return Ok(res);

        }


    }
}
