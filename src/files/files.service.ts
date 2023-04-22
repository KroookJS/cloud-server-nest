import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity, FileSize } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>
  ) {}

  findAll(userId: number, fileType: string) {
    const qb = this.repository.createQueryBuilder('file');

    qb.where('file.userId = :userId', { userId });

    if (fileType === FileSize.PHOTOS) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
    }

    if (fileType === FileSize.TRASH) {
      qb.withDeleted().andWhere('file.deleteAt IS NOT NULL');
    }

    return qb.getMany();
  }

  create(file: Express.Multer.File, userId: number) {
    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  remove(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const qb = this.repository.createQueryBuilder('file');
    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    return qb.softDelete().execute();

  }
}