const ChecarImagem = async (url, setImageExists) => {
    try {
        const response = await fetch(url);
        setImageExists(response.ok);
    } catch (error) {
        setImageExists(false);
    }
};

export default ChecarImagem