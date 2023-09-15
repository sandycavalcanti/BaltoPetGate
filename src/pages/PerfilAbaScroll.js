import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, PanResponder, ActivityIndicator, Platform, TouchableOpacity, Alert, StatusBar, SafeAreaView, ToastAndroid } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Perfil from './Perfil';
import axios from 'axios';
import { corBordaBoxCad, corFundo, corFundoCad, urlAPI } from '../constants';
import Post from '../components/perfil/Post';
import Perfil_post from '../components/perfil/Perfil_post';
import DecodificarToken from '../utils/DecodificarToken';
import AnimalPost from '../components/perfil/AnimalPost';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 48;
const SafeStatusBar = Platform.select({ ios: 44, android: StatusBar.currentHeight, });
const tab1ItemSize = (windowWidth - 30);
const tab2ItemSize = (windowWidth - 40) / 3;
let HeaderHeight
let TB_PESSOA_IDD;

const PerfilAbaScroll = ({ navigation: { navigate } }) => {
  // stats
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'tab1', title: 'Animais' },
    { key: 'tab2', title: 'Postagens' },
  ]);
  const [canScroll, setCanScroll] = useState(true);

  // ref
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);
  const [perfilHeight, setPerfilHeight] = useState(450);

  const [carregando, setCarregando] = useState(true);
  HeaderHeight = perfilHeight;
  const [selectAnimal, setSelectAnimal] = useState([]);
  const [selectPostagem, setSelectPostagem] = useState([]);

  const Selecionar = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD = decodedToken.TB_PESSOA_IDD;
    axios.post(urlAPI + 'selanimal/filtrar', {
      TB_PESSOA_ID: TB_PESSOA_IDD
    }).then((response) => {
      setSelectAnimal(response.data);
    }).catch((error) => {
      let erro = error.response.data.message;
      ToastAndroid.show('Erro ao exibir itens', ToastAndroid.SHORT);
      console.error('Erro ao selecionar:', erro);
    })
    axios.post(urlAPI + 'selpostagem/filtrar', {
      TB_PESSOA_ID: TB_PESSOA_IDD
    }).then((response) => {
      setSelectPostagem(response.data);
    }).catch((error) => {
      let erro = error.response.data.message;
      ToastAndroid.show('Erro ao exibir itens', ToastAndroid.SHORT);
      console.error('Erro ao selecionar:', erro);
    })
  };

  useEffect(() => {
    Selecionar()
  }, []);
  
  // PanResponder for header
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderRelease: (evt, gestureState) => {
        syncScrollOffset();
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        headerScrollY.setValue(scrollY._value);
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        listRefArr.current.forEach(item => {
          if (item.key !== routes[_tabIndex.current].key) {
            return;
          }
          if (item.value) {
            item.value.scrollToOffset({
              offset: -gestureState.dy + headerScrollStart.current,
              animated: false,
            });
          }
        });
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    }),
  ).current;

  //PanResponder for list in tab scene
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
    }),
  ).current;

  // effect
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({ value }) => {
      listRefArr.current.forEach((item) => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HeaderHeight) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  // helper functions
  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  // render Helper
  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[styles.header, { transform: [{ translateY: y }] }]}>
        <Perfil navigate={navigate} TB_PESSOA_IDD={TB_PESSOA_IDD} setPerfilHeight={setPerfilHeight} scrollY={scrollY} setCarregando={setCarregando} />
      </Animated.View>
    );
  };

  const renderTab1Item = ({ item, index }) => {
    return (
      <AnimalPost texto={item.TB_ANIMAL_NOME} id={item.TB_ANIMAL_ID} navigate={navigate} data={item.createdAt} />
    );
  };

  const renderTab2Item = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: '#CEF7FF', justifyContent: 'space-around' }}>
        <Perfil_post />
        <Post textoPost={item.TB_POSTAGEM_TEXTO} />
      </View>
    );
  };

  const renderLabel = ({ route, focused }) => {
    return (
      <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({ route }) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;
    switch (route.key) {
      case 'tab1':
        numCols = 1;
        data = selectAnimal;
        renderItem = renderTab1Item;
        break;
      case 'tab2':
        numCols = 1;
        data = selectPostagem;
        renderItem = renderTab2Item;
        break;
      default:
        return null;
    }
    return (
      <Animated.FlatList
        scrollEnabled={canScroll}
        {...listPanResponder.panHandlers}
        numColumns={numCols}
        ref={(ref) => {
          if (ref) {
            const found = listRefArr.current.find((e) => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
        scrollEventThrottle={16}
        onScroll={focused ?
          Animated.event([{
            nativeEvent: { contentOffset: { y: scrollY } },
          }], { useNativeDriver: true }) : null}
        onMomentumScrollBegin={() => isListGliding.current = true}
        onScrollEndDrag={() => syncScrollOffset()}
        onMomentumScrollEnd={() => { isListGliding.current = false; syncScrollOffset() }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingTop: HeaderHeight + TabBarHeight, paddingHorizontal: 10, minHeight: windowHeight - SafeStatusBar + HeaderHeight }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={{ top: 0, zIndex: 1, position: 'absolute', transform: [{ translateY: y }], width: '100%' }}>
        <TabBar {...props} onTabPress={({ route, preventDefault }) => { if (isListGliding.current) preventDefault() }} style={styles.tab}
          renderLabel={renderLabel} indicatorStyle={styles.indicator} />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView onSwipeStart={() => setCanScroll(false)} onSwipeEnd={() => setCanScroll(true)}
        onIndexChange={(id) => { _tabIndex.current = id; setIndex(id) }} navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene} renderTabBar={renderTabBar} initialLayout={{ height: 0, width: windowWidth }} />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={[styles.carregandoView, { display: carregando ? 'flex' : 'none' }]}>
          <ActivityIndicator size="large" color={corBordaBoxCad} />
        </View>
        {renderTabView()}
        {renderHeader()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HeaderHeight,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#C1E6CD',
  },
  label: {
    fontSize: 16,
    color: '#222'
  },
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#A7DEC0',
    height: TabBarHeight,
  },
  indicator: {
    backgroundColor: '#222'
  },
  carregandoView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: corFundo,
    zIndex: 10,
  }
});

export default PerfilAbaScroll;