// Importando os pacotes necessários
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";

//Baixar Pacote
import axios from "axios";


// Criando um componente funcional chamado Postagem
const Postagem = () => {
  // Definindo os estados para armazenar a imagem e o comentário
  const [imagem, setImagem] = useState(null);
  const [comentario, setComentario] = useState("");

  // Salvar Banco de Dados
  // Criando um estado para armazenar a string base64 da imagem
  const [imagemBase64, setImagemBase64] = useState(null);

  const converterImagem = async (uri) => {
    // Verifica se a URI é válida
    if (uri) {
      // Criando um objeto FileReader
      let reader = new FileReader();
      // Definindo o que fazer quando a leitura for concluída
      reader.onloadend = () => {
        // Verifica se reader.result não é nulo antes de atualizar o estado da string base64
        if (reader.result) {
          // Atualizando o estado da string base64 com o resultado da leitura
          setImagemBase64(reader.result);
        } else {
          console.error('Erro ao converter imagem para base64: resultado nulo');
        }
      };
      // Lendo a imagem como uma string base64
      reader.readAsDataURL(uri);
    } else {
      console.error('URI da imagem inválida');
    }
  };

  // Chamando a função para converter a imagem quando ela for escolhida
  useEffect(() => {
    if (imagem) {
      converterImagem(imagem);
    }
  }, [imagem]);

  // Alterando a função InserirDados para enviar a string base64 da imagem junto com o comentário
  const InserirDados = () => {
    axios
      .post("https://apibalto.vercel.app/" + "cadpostagem", {
        TB_PESSOA_ID: 1,
        TB_POSTAGEM_TEXTO: comentario,
        TB_POSTAGEM_IMG1: imagemBase64,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // Definindo um estado para armazenar a lista de postagens
  const [postagens, setPostagens] = useState([]);

  // Definindo um estado para armazenar o índice da postagem que está sendo editada
  const [indiceEditando, setIndiceEditando] = useState(null);

  // Definindo uma função para pedir permissão para acessar a galeria ou a câmera
  const pedirPermissao = async () => {
    // Verificando se o dispositivo tem permissão para acessar a galeria ou a câmera
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // Se não tiver, mostrando um alerta de erro
    if (status !== "granted") {
      alert(
        "Desculpe, mas precisamos da sua permissão para acessar a galeria ou a câmera"
      );
    }
  };

  // Definindo uma função para escolher uma imagem da galeria ou da câmera
const escolherImagem = async () => {
  // Chamando a função para pedir permissão
  await pedirPermissao();
  // Criando as opções para o ImagePicker
  const opcoes = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  };

  // Chamando o método launchImageLibraryAsync do ImagePicker
  let resposta = await ImagePicker.launchImageLibraryAsync(opcoes);

  // Verificando se houve algum erro ou cancelamento
  if (!resposta.canceled) {
    // Verificando se há um item na matriz assets
    if (resposta.assets.length > 0) {
      // Acessando a matriz "assets" para obter o caminho da imagem escolhida
      const imagemEscolhida = resposta.assets[0];
      if (imagemEscolhida) {
        // Atualizando o estado da imagem com o caminho da imagem escolhida
        setImagem(imagemEscolhida.uri);
      }
    } else {
      alert("Não foi possível obter a imagem selecionada.");
    }
  }
};


  // Definindo uma função para editar o comentário
  const editarComentario = (texto) => {
    // Atualizando o estado do comentário com o texto digitado
    setComentario(texto);
  };

  // Definindo uma função para postar a imagem e o comentário
  const postar = () => {
    InserirDados();
    // Verificando se a imagem e o comentário não estão vazios
    if (imagem && comentario) {
      // Fazendo alguma lógica para enviar a imagem e o comentário para algum servidor ou banco de dados
      // Por exemplo, usando o método fetch ou axios
      // Neste caso, vamos apenas adicionar a imagem e o comentário na lista de postagens
      setPostagens((postagensAnteriores) => [
        ...postagensAnteriores,
        { imagem: imagem, comentario: comentario },
      ]);
      // Limpando os estados da imagem e do comentário
      setImagem(null);
      setComentario("");
    } else {
      // Caso contrário, mostrando um alerta de erro
      alert("Você precisa escolher uma imagem e digitar um comentário");
    }
  };

  // Definindo uma função para editar uma postagem existente na lista de postagens
  const editarPostagem = (indice) => {
    setModalVisible(false);
    // Obtendo a postagem pelo índice na lista de postagens
    let postagem = postagens[indice];
    // Atualizando os estados da imagem e do comentário com os dados da postagem
    setImagem(postagem.imagem);
    setComentario(postagem.comentario);
    // Atualizando o estado do índice da postagem que está sendo editada
    setIndiceEditando(indice);
  };

  // Definindo uma função para salvar as alterações feitas na postagem
  const salvarPostagem = () => {
    // Verificando se o índice da postagem que está sendo editada não é nulo
    if (indiceEditando !== null) {
      // Criando uma cópia da lista de postagens
      let postagensAtualizadas = [...postagens];
      // Alterando a postagem pelo índice com os novos dados da imagem e do comentário
      postagensAtualizadas[indiceEditando] = {
        imagem: imagem,
        comentario: comentario,
      };
      // Atualizando o estado da lista de postagens com a cópia alterada
      setPostagens(postagensAtualizadas);
      // Limpando os estados da imagem, do comentário e do índice da postagem que está sendo editada
      setImagem(null);
      setComentario("");
      setIndiceEditando(null);
    } else {
      // Caso contrário, mostrando um alerta de erro
      alert("Você precisa escolher uma postagem para editar");
    }
  };

  // Definindo uma função para deletar uma postagem existente na lista de postagens
  const deletarPostagem = (indice) => {
    setModalVisible(false);
    // Criando uma função para confirmar a exclusão da postagem
    // Alterando a função confirmarDeletar para fazer uma requisição HTTP para o servidor com o id da postagem que será excluída
    const confirmarDeletar = () => {
      // Obtendo o id da postagem pelo índice na lista de postagens
      let id = postagens[indice].id;
      // Fazendo uma requisição HTTP para o servidor com o método delete e o id da postagem
      axios
        .delete("https://apibalto.vercel.app/" + "delpostagem/" + id)
        .then((response) => {
          console.log(response);
          // Criando uma cópia da lista de postagens
          let postagensAtualizadas = [...postagens];
          // Removendo a postagem pelo índice da cópia
          postagensAtualizadas.splice(indice, 1);
          // Atualizando o estado da lista de postagens com a cópia alterada
          setPostagens(postagensAtualizadas);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Mostrando um alerta para confirmar a exclusão da postagem
    Alert.alert(
      "Deletar postagem",
      "Você tem certeza que quer deletar essa postagem?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: confirmarDeletar },
      ]
    );
  };
  const [modalVisible, setModalVisible] = useState(false);

  // Função para abrir o modal
  const abrirModal = () => {
    setModalVisible(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalVisible(false);
  };
  // Definindo uma função para renderizar cada item da lista de postagens
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <View style={styles.botoes}>
          <View style={{ width: 340, alignItems: "flex-end" }}>
            <Entypo
              style={{ justifyContent: "center" }}
              name="dots-three-horizontal"
              size={24}
              color="black"
              onPress={abrirModal}
            />
          </View>
          {/* Renderiza o modal se o estado for verdadeiro */}
          {modalVisible && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={fecharModal}
            >
              <View style={styles.modal}>
                <TouchableOpacity onPress={() => editarPostagem(index)}>
                  <Text style={styles.botao}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deletarPostagem(index)}>
                  <Text style={styles.botao}>Deletar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={fecharModal}>
                  <Text style={styles.botao}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          )}
        </View>
        <Image source={{ uri: item.imagem }} style={styles.imagem} />
        <View style={{ backgroundColor: "#94E4E6" }}>
          <Text style={styles.comentario}>{item.comentario}</Text>
        </View>
      </View>
    );
  };

  // Retornando a interface do componente
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar uma postagem de imagem</Text>
      <Button title="Escolher imagem" onPress={escolherImagem} />
      {imagem && <Image source={{ uri: imagem }} style={styles.imagem} />}
      <TextInput
        style={styles.input}
        placeholder="Digite um comentário"
        value={comentario}
        onChangeText={editarComentario}
      />
      {indiceEditando === null ? (
        <Button title="Postar" onPress={postar} />
      ) : (
        <Button title="Salvar" onPress={salvarPostagem} />
      )}
      <FlatList
        data={postagens}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

// Definindo os estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#94E4E6",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  imagem: {
    width: 360,
    height: 300,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  item: {
    borderColor: "white",
    backgroundColor: "#9DE3B8",
    borderBottomWidth: 1,
    borderRadius: 5,
    margin: 0,
  },
  comentario: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  botao: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#00f",
    padding: 10,
    borderRadius: 5,
  },
});

// Exportando o componente
export default Postagem;
