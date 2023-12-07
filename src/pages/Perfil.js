import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, PanResponder, ActivityIndicator, Platform, TouchableOpacity, Alert, StatusBar, SafeAreaView, ToastAndroid } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import PerfilLayout from './PerfilLayout';
import axios from 'axios';
import { corFundo, urlAPI } from '../constants';
import Post from '../components/perfil/Post';
import Perfil_post from '../components/perfil/Perfil_post';
import AnimalPost from '../components/perfil/AnimalPost';
import { useRoute } from '@react-navigation/native';
import Carregando from '../components/geral/Carregando';
import DecodificarToken from '../utils/DecodificarToken';
import CatchError from '../utils/CatchError';

const AnimatedIndicator = Animated.createAnimatedComponent(ActivityIndicator);
const TabBarHeight = 48;
const SafeStatusBar = Platform.select({ ios: 44, android: StatusBar.currentHeight, });
const PullToRefreshDist = 125;
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Perfil = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;

  const TB_PESSOA_IDD = useRef(null);
  const [perfilHeight, setPerfilHeight] = useState(440);
  const HeaderHeight = perfilHeight;
  const pessoal = useRef(false);
  const [selectPessoa, setSelectPessoa] = useState({});
  const selectAnimal = useRef([]);
  const selectPostagem = useRef([]);
  const selectAvaliacao = useRef({});
  const selectSeguindo = useRef([]);
  const [carregando, setCarregando] = useState(true);
  const controller = new AbortController();

  const SelecionarItens = async () => {
    await Promise.all([
      axios.get(urlAPI + 'selpessoa/' + id, { signal: controller.signal })
        .then(response => {
          setSelectPessoa(response.data[0]);
        }).catch(error => {
          if (error.response) {
            setSelectPessoa({ "TB_PESSOA_NOME_PERFIL": error.response.data.message });
          } else {
            setSelectPessoa({ "TB_PESSOA_NOME_PERFIL": 'Houve um erro ao carregar o perfil' });
          }
        }),
      axios.post(urlAPI + 'selanimaisperfil/filtrar', { TB_PESSOA_ID: id }, { signal: controller.signal })
        .then(response => {
          selectAnimal.current = response.data;
        }).catch(CatchError),
      axios.post(urlAPI + 'selpostagem/filtrar', { TB_PESSOA_ID: id }, { signal: controller.signal })
        .then(response => {
          selectPostagem.current = response.data;
        }).catch(CatchError),
      axios.post(urlAPI + 'selavaliacao/filtrar', { TB_PESSOA_AVALIADA_ID: id }, { signal: controller.signal })
        .then(response => {
          selectAvaliacao.current = response.data;
        }).catch(CatchError),
      axios.post(urlAPI + 'selinteracao/filtrar', {
        TB_TIPO_INTERACAO_ID: 1,
        TB_PESSOA_DESTINATARIO_ID: id
      }, { signal: controller.signal })
        .then(response => {
          selectSeguindo.current = response.data;
        }).catch(CatchError),
    ]);
    setTimeout(() => {
      setCarregando(false);
    }, 500);
  }

  const Selecionar = async () => {
    const decodedToken = await DecodificarToken();
    TB_PESSOA_IDD.current = decodedToken.TB_PESSOA_IDD;
    pessoal.current = TB_PESSOA_IDD.current === id;
    SelecionarItens();
  };

  useEffect(() => {
    Selecionar();
    return (() => {
      controller.abort();
    })
  }, []);


  // CÓDIGO DA TAB
  const [tabIndex, setIndex] = useState(0);
  const routes = [{ key: 'tab1', title: 'Animais' }, { key: 'tab2', title: 'Postagens' },];
  const [canScroll, setCanScroll] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  const headerMoveScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);
  const refreshStatusRef = useRef(false);
  const refresh = async () => { refreshStatusRef.current = true; await new Promise((resolve, reject) => { SelecionarItens().then(() => { resolve('done'); }) }).then(value => { refreshStatusRef.current = false; }); };
  const headerPanResponder = useRef(PanResponder.create({ onStartShouldSetPanResponderCapture: (evt, gestureState) => false, onMoveShouldSetPanResponderCapture: (evt, gestureState) => false, onStartShouldSetPanResponder: (evt, gestureState) => { headerScrollY.stopAnimation(); syncScrollOffset(); return false; }, onMoveShouldSetPanResponder: (evt, gestureState) => { headerScrollY.stopAnimation(); return Math.abs(gestureState.dy) > 5; }, onPanResponderEnd: (evt, gestureState) => { handlePanReleaseOrEnd(evt, gestureState); }, onPanResponderMove: (evt, gestureState) => { const curListRef = listRefArr.current.find(ref => ref.key === routes[_tabIndex.current].key,); const headerScrollOffset = -gestureState.dy + headerScrollStart.current; if (curListRef.value) { if (headerScrollOffset > 0) { curListRef.value.scrollToOffset({ offset: headerScrollOffset, animated: false }); } else { if (Platform.OS === 'ios') { curListRef.value.scrollToOffset({ offset: headerScrollOffset / 3, animated: false }); } else if (Platform.OS === 'android') { if (!refreshStatusRef.current) { headerMoveScrollY.setValue(headerScrollOffset / 1.5); } } } } }, onShouldBlockNativeResponder: () => true, onPanResponderGrant: (evt, gestureState) => { headerScrollStart.current = scrollY._value; }, })).current;
  const listPanResponder = useRef(PanResponder.create({ onStartShouldSetPanResponderCapture: (evt, gestureState) => false, onMoveShouldSetPanResponderCapture: (evt, gestureState) => false, onStartShouldSetPanResponder: (evt, gestureState) => false, onMoveShouldSetPanResponder: (evt, gestureState) => { headerScrollY.stopAnimation(); return false; }, onShouldBlockNativeResponder: () => true, onPanResponderGrant: (evt, gestureState) => { headerScrollY.stopAnimation(); }, }),).current;
  useEffect(() => { scrollY.addListener(({ value }) => { const curRoute = routes[tabIndex].key; listOffset.current[curRoute] = value; }); headerScrollY.addListener(({ value }) => { listRefArr.current.forEach((item) => { if (item.key !== routes[tabIndex].key) return; if (value > HeaderHeight || value < 0) { headerScrollY.stopAnimation(); syncScrollOffset(); } if (item.value && value <= HeaderHeight) { item.value.scrollToOffset({ offset: value, animated: false }); } }); }); return () => { scrollY.removeAllListeners(); headerScrollY.removeAllListeners(); }; }, [routes, tabIndex]);
  const syncScrollOffset = () => { const curRouteKey = routes[_tabIndex.current].key; listRefArr.current.forEach((item) => { if (item.key !== curRouteKey) { if (scrollY._value < HeaderHeight && scrollY._value >= 0) { if (item.value) { item.value.scrollToOffset({ offset: scrollY._value, animated: false }); listOffset.current[item.key] = scrollY._value; } } else if (scrollY._value >= HeaderHeight) { if (listOffset.current[item.key] < HeaderHeight || listOffset.current[item.key] == null) { if (item.value) { item.value.scrollToOffset({ offset: HeaderHeight, animated: false }); listOffset.current[item.key] = HeaderHeight; } } } } }); };
  const startRefreshAction = () => { if (Platform.OS === 'ios') { listRefArr.current.forEach((listRef) => { listRef.value.scrollToOffset({ offset: -50, animated: true }); }); refresh().finally(() => { syncScrollOffset(); if (scrollY._value < 0) { listRefArr.current.forEach((listRef) => { listRef.value.scrollToOffset({ offset: 0, animated: true }); }); } }); } else if (Platform.OS === 'android') { Animated.timing(headerMoveScrollY, { toValue: -150, duration: 300, useNativeDriver: true }).start(); refresh().finally(() => { Animated.timing(headerMoveScrollY, { toValue: 0, duration: 300, useNativeDriver: true }).start(); }); } };
  const handlePanReleaseOrEnd = (evt, gestureState) => { syncScrollOffset(); headerScrollY.setValue(scrollY._value); if (Platform.OS === 'ios') { if (scrollY._value < 0) { if (scrollY._value < -PullToRefreshDist && !refreshStatusRef.current) { startRefreshAction(); } else { listRefArr.current.forEach((listRef) => { listRef.value.scrollToOffset({ offset: 0, animated: true }); }); } } else { if (Math.abs(gestureState.vy) < 0.2) return; Animated.decay(headerScrollY, { velocity: -gestureState.vy, useNativeDriver: true }).start(() => syncScrollOffset()); } } else if (Platform.OS === 'android') { if (headerMoveScrollY._value < 0 && headerMoveScrollY._value / 1.5 < -PullToRefreshDist) { startRefreshAction(); } else { Animated.timing(headerMoveScrollY, { toValue: 0, duration: 300, useNativeDriver: true }).start(); } } };
  const renderLabel = ({ route, focused }) => <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}> {route.title}</Text>;
  const renderScene = ({ route }) => { const focused = route.key === routes[tabIndex].key; let numCols, data, renderItem; switch (route.key) { case 'tab1': numCols = 1; data = selectAnimal.current; renderItem = renderTab1Item; break; case 'tab2': numCols = 1; data = selectPostagem.current; renderItem = renderTab2Item; break; default: return null; }   return <Animated.FlatList scrollToOverflowEnabled={true} scrollEnabled={canScroll} {...listPanResponder.panHandlers} numColumns={numCols} ref={ref => { if (ref) { const found = listRefArr.current.find((e) => e.key === route.key); if (!found) { listRefArr.current.push({ key: route.key, value: ref }); } } }} scrollEventThrottle={16} onScroll={focused ? Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } }, },], { useNativeDriver: true },) : null} onMomentumScrollBegin={() => isListGliding.current = true} onScrollEndDrag={e => { syncScrollOffset(); const offsetY = e.nativeEvent.contentOffset.y; if (Platform.OS === 'ios') if (offsetY < -PullToRefreshDist && !refreshStatusRef.current) startRefreshAction(); }} onMomentumScrollEnd={() => { isListGliding.current = false; syncScrollOffset(); }} contentContainerStyle={{ paddingTop: HeaderHeight + TabBarHeight, minHeight: windowHeight - SafeStatusBar + HeaderHeight, }} showsHorizontalScrollIndicator={false} data={data} renderItem={renderItem} showsVerticalScrollIndicator={false} keyExtractor={(item, index) => index.toString()} />; };
  const renderTabBar = (props) => { const y = scrollY.interpolate({ inputRange: [0, HeaderHeight], outputRange: [HeaderHeight, 0], extrapolate: 'clamp' }); return (<Animated.View style={{ top: 0, zIndex: 1, position: 'absolute', transform: [{ translateY: y }], width: '100%' }}><TabBar {...props} onTabPress={({ route, preventDefault }) => { if (isListGliding.current) preventDefault() }} style={styles.tab} renderLabel={renderLabel} indicatorStyle={styles.indicator} /></Animated.View>); };
  const renderTabView = () => <TabView onSwipeStart={() => setCanScroll(false)} onSwipeEnd={() => setCanScroll(true)} onIndexChange={(id) => { _tabIndex.current = id; setIndex(id) }} navigationState={{ index: tabIndex, routes }} renderScene={renderScene} renderTabBar={renderTabBar} initialLayout={{ height: 0, width: windowWidth }} />;
  const renderCustomRefresh = () => Platform.select({ ios: (<AnimatedIndicator style={{ top: -50, position: 'absolute', alignSelf: 'center', transform: [{ translateY: scrollY.interpolate({ inputRange: [-100, 0], outputRange: [120, 0], extrapolate: 'clamp' }), },], }} animating />), android: (<Animated.View style={{ transform: [{ translateY: headerMoveScrollY.interpolate({ inputRange: [-300, 0], outputRange: [150, 0], extrapolate: 'clamp', }), },], backgroundColor: '#eee', height: 38, width: 38, borderRadius: 19, borderWidth: 2, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', top: -50, position: 'absolute' }}><ActivityIndicator animating /></Animated.View>), });


  const renderHeader = () => {
    const y = scrollY.interpolate({ inputRange: [0, HeaderHeight], outputRange: [0, -HeaderHeight], extrapolate: 'clamp' });
    return (
      <Animated.View {...headerPanResponder.panHandlers} style={[styles.header, { transform: [{ translateY: y }], height: HeaderHeight, }]}>
        <PerfilLayout avaliacoes={selectAvaliacao.current} seguindo={selectSeguindo.current} pessoal={pessoal.current} TB_PESSOA_IDD={TB_PESSOA_IDD.current} data={selectPessoa} setPerfilHeight={setPerfilHeight} scrollY={scrollY} navigation={navigation} carregando={carregando} />
      </Animated.View>
    );
  };

  const renderTab1Item = ({ item, index }) => {
    return (
      <>
        <Perfil_post data={item} pessoal={pessoal.current} tipo="animal" itemId={item.TB_ANIMAL_ID} podeEditar reativar={!item.TB_ANIMAL_STATUS} onRefresh={() => refresh()} />
        <AnimalPost data={item} desativado={!item.TB_ANIMAL_STATUS} />
      </>
    );
  };

  const renderTab2Item = ({ item, index }) => {
    const podeEditar = item.createdAt == item.updatedAt;
    return (
      <View style={{ backgroundColor: '#CEF7FF', justifyContent: 'space-around' }}>
        <Perfil_post data={item} pessoal={pessoal.current} tipo="post" itemId={item.TB_POSTAGEM_ID} podeEditar={podeEditar} onRefresh={() => refresh()} />
        <Post data={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Carregando carregando={carregando} />
        {renderTabView()}
        {renderHeader()}
        {renderCustomRefresh()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corFundo,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#C1E6CD',
  },
  label: {
    fontSize: 16,
    color: '#216327'
  },
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#A7DEC0',
    height: TabBarHeight,
  },
  indicator: {
    backgroundColor: '#A7DEC0',
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: '#fff'
  },
});

export default Perfil;