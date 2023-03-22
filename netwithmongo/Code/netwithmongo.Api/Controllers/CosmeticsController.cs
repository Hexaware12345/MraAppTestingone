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
    public class CosmeticsController : ControllerBase
    {
        ICosmeticsService _CosmeticsService;
        private readonly IMapper _mapper;
        public CosmeticsController(ICosmeticsService CosmeticsService,IMapper mapper)
        {
            _CosmeticsService = CosmeticsService;
            _mapper = mapper;
        }

        // GET: api/Cosmetics
        [HttpGet]
        public ActionResult<IEnumerable<CosmeticsDto>> Get()
        {
            var CosmeticsDTOs = _mapper.Map<IEnumerable<CosmeticsDto>>(_CosmeticsService.GetAll());
            return Ok(CosmeticsDTOs);
        }

        [HttpGet("{id}")]
        public ActionResult<CosmeticsDto> GetById(string id)
        {
            var CosmeticsDTO = _mapper.Map<CosmeticsDto>(_CosmeticsService.Get(id));
            return Ok(CosmeticsDTO);
        }

        [HttpPost]
        public ActionResult<CosmeticsDto> Save(Cosmetics Cosmetics)
        {
            var CosmeticsDTOs = _mapper.Map<CosmeticsDto>(_CosmeticsService.Save(Cosmetics));
            return Ok(CosmeticsDTOs);
        }

        [HttpPut("{id}")]
        public ActionResult<CosmeticsDto> Update([FromRoute] string id, Cosmetics Cosmetics)
        {
            var CosmeticsDTOs = _mapper.Map<CosmeticsDto>(_CosmeticsService.Update(id, Cosmetics));
            return Ok(CosmeticsDTOs);
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            bool res = _CosmeticsService.Delete(id);
            if(res== false) return null;
            return Ok(res);

        }


    }
}
