import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');


export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder),

  storage: multer.diskStorage({
    //path para passar caminho para todo sistema operacional
    // dirname - diretório que o arquivo está. Caminho inteiro do computador até a pasta config.
    //joga os arquivos para pasta tmp
    destination: tmpFolder,

    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  }),
};
