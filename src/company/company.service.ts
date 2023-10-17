import { Injectable } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  create(company: CreateCompanyInput): Promise<Company> {
    const comp = this.companyRepository.create(company);
    return this.companyRepository.save(comp);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({
      relations: ['employees'], // relation ship in company.entity.ts
    });
  }

  async findOne(id: string): Promise<Company> {
    // return `This action find a #${id} company`;
    return this.companyRepository.findOne({
      where: { id },
      relations: ['employees'],
    });
  }

  async update(id: string, company: UpdateCompanyInput): Promise<Company> {
    const comp = this.companyRepository.create(company);
    comp.id = id;
    return this.companyRepository.save(comp);
  }

  async remove(id: string): Promise<void> {
    this.companyRepository.delete(id);
  }
}
