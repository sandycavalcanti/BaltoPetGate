import * as FileSystem from 'expo-file-system'

// Função que retorna uma mensagem se o tamanho da imagem for maior do que o tamanho pedido
export default async function VerificarTamanhoImagem(result, tamanho) {

    const getFileInfo = async (fileURI) => {
        const fileInfo = await FileSystem.getInfoAsync(fileURI)
        return fileInfo
    }

    const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
        const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
        return isOk
    }

    const tamanhoPermitido = tamanho ? tamanho : 3;

    const fileInfo = await getFileInfo(result.assets[0].uri);

    if (!fileInfo?.size || result.assets[0].type !== 'image') {
        return 'Selecione um arquivo do tipo imagem';
    }
    const arquivoPermitido = isLessThanTheMB(fileInfo.size, tamanhoPermitido);

    if (!arquivoPermitido) {
        return `Selecione uma imagem com menos de ${tamanhoPermitido}MB`;
    }
    return null;
}