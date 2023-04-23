import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  View
} from "react-native";
// import tw from 'twrnc';
import Feed from './Feed';
import ViewPager from '@react-native-community/viewpager';

// import server from '../server.json';
import { Container, Text } from '../theme/home';
// import { useNote, useProfile } from "store/hooks"


// import Swiper from "react-native-deck-swiper";

const HomeVideoScroller = (props) => {
  // const navigation = useNavigation();
  // // const connector = useWalletConnect();
  // // const [tab, setTab] = useState(1);
  const [active, setActive] = useState(0);
  // const dispatch = useDispatch()
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  // const note = useNote(props?.data)
  // const [data, setData] = useState(props as [])

  useEffect(() => {
    // setTab(1)
    //Get device Height
    setHeight(Dimensions.get('window').height);
    //Get device Width
    setWidth(Dimensions.get('window').width);

    // navigation.setOptions({
    //   headerLeft: (_props: StackHeaderLeftButtonProps) => (<MenuIcon />),
    //   headerRight: (props: StackHeaderRightButtonProps) => (
    //     <TouchableOpacity
    //       onPress={() => navigation.navigate("Scan")}
    //     >
    //       <FontAwesome
    //         style={{ borderWidth: 5, borderColor: 'white', borderRadius: 20, margin: 10, marginRight: 20 }}
    //         name="camera-retro" size={12} color="orange" />
    //     </TouchableOpacity>
    //   )
    // });
  });

  const _loadMoreContentAsync = async () => {
    const url = 'https://google.com'
    const options = {
      method: 'GET',
      // body: JSON.stringify(completeOrder),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options);
    const data = await response.json();
    // setData(data)
    console.log('infinite content load: ', data)
  }

  return (
    <SafeAreaView>
      <Container>
        {/* <Header>
          <Tab onPress={() => setTab(1)}>
            <Text active={tab === 1}>Browse</Text>
          </Tab>
          <Separator>|</Separator>
          <Tab onPress={() => {
            setTab(2)
            navigation.navigate("Scan")
          }}>
            <Text active={tab === 2}>Mint</Text>
          </Tab>
        </Header> */}
        <ViewPager
          onPageSelected={e => {
            setActive(e.nativeEvent.position);
          }}
          orientation="vertical"
          style={{ flex: 1 }}
          initialPage={0}
        >
          {/* {note?.map(item => (
            <View key={item?.id}>
              <Feed item={item} play={Number(item?.id) === active} />
            </View>
          ))} */}

        </ViewPager>
      </Container>
      <Text>
        {JSON.stringify(props)}
      </Text>
    </SafeAreaView>
  );
};

export default HomeVideoScroller;