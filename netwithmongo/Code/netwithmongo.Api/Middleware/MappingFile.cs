using netwithmongo.BusinessEntities.Entities;
using netwithmongo.Contracts.DTO;
using AutoMapper;

public class MappingFile : Profile
{
    public MappingFile()
    {
        // Mapping variables
		CreateMap<Cosmetics , CosmeticsDto>(); 
		CreateMap<Electronics , ElectronicsDto>(); 
    }
}
