import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const imgAllowed = /image\/jpeg|image\/jpg|image\/png|image\/svg/i;
      if (!imgAllowed.test(file.mimetype)) {
        throw new BadRequestException("Такое расширение не разрешено");
      }
      const fileName = uuid.v4() + path.extname(file.originalname);
      // const filePath = path.resolve(__dirname, '..', 'static')
      const filePath = path.resolve("src", "static");
      // if (!fs.existsSync(filePath)){
      //     fs.mkdirSync(filePath, {recursive: true})
      // }
      if (!fs.existsSync(filePath)) {
        fs.mkdir(filePath, { recursive: true }, (err) => {
          if (err)
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        });
      }
      // fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      fs.writeFile(path.join(filePath, fileName), file.buffer, (err) => {
        if (err) throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
      return fileName;
    } catch (e) {
      throw new HttpException(
        "Произошла ошибка при записи файла",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
