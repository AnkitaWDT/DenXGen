/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import {
  PixelRatio, RefreshControl, View, Image, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, Text, TouchableWithoutFeedback, Modal, Dimensions, FlatList
} from 'react-native';
import commonStyles from '../components/CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Image as SvgImage } from 'react-native-svg';
import CustomYearPicker from '../components/CustomYearPicker';
import CustomMonthPicker from '../components/CustomMonthPicker';
import CustomModal from '../components/CustomModal';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import Video from 'react-native-video';
import SocialLink from '../components/SocialLinks';
import AlertPopup from '../components/AlertPopup';
import { moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
  const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const ReadMoreText = ({ text, initialLimit }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const readMoreText = showFullText ? 'Read Less' : 'Read More';

  const textToShow = showFullText ? text : `${text.slice(0, initialLimit)}...`;

  return (
    <View>
      <Text style={commonStyles.headerText3BL}>{textToShow}</Text>
      {text.length > initialLimit && (
        <TouchableOpacity onPress={toggleText}>
          <Text style={[commonStyles.headerText3BL, { fontFamily: 'DMSans-SemiBold'}]}>{readMoreText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ProfileScreen = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Perform your refresh logic here, for example fetching new data

    // After the data is refreshed, set refreshing to false
    setRefreshing(false);
  };

  const [editIndex, setEditIndex] = useState(null);

  const [sections, setSections] = useState([
    {
      id: 1,
      schoolName: '',
      graduated: false,
      fromYear: '',
      fromMonth: '',
      toYear: '',
      toMonth: '',
      degree: '',
    },
  ]);
  const [isEducationModalVisible, setIsEducationModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(1);

  const [selectedFromYears, setSelectedFromYears] = useState({});
  const [selectedToYears, setSelectedToYears] = useState({});
  const [isYearPickerVisible, setYearPickerVisible] = useState(false);
  const [yearPickerType, setYearPickerType] = useState(null);

  const [selectedFromMonths, setSelectedFromMonths] = useState({});
  const [selectedToMonths, setSelectedToMonths] = useState({});
  const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);
  const [monthPickerType, setMonthPickerType] = useState(null);

  const [selectedYear, setSelectedYear] = useState(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = index => {
    setSelectedImageIndex(index);
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const [servicesData, setServicesData] = useState([
    'Dental implant',
    'Root canal',
    'Teeth Whitening',
    'Root canal treatment',
    'Dentures',
    'Teeth cleaning',
    'Dental braces',
  ]);

  const educationData = [
    {
      licNo: 'D.Y. Patil College Of Dental Institute',
      licText: 'BDS, Oral pathology, Dentistry',
      fromYear: '2022',
      fromMonth: 'Jun',
    },
    {
      licNo: 'D.Y. Patil D.Y. Patil College Of Dental Institute College ueh Of Dental Institute',
      licText: 'BDS, Oral pathology, Dentistry',
      fromYear: '2022',
      fromMonth: 'June',
      toYear: '2023',
      toMonth: 'Aug',
    },
    {
      licNo: 'D.Y. Patil College Of Dental Institute',
      licText: 'BDS, Oral pathology, Dentistry',
      fromYear: '2022',
      fromMonth: 'July',
    },
    // Add more education entries as needed
  ];
  const experienceData = [
    {
      licNo: 'D.Y. Patil College Of Dental Institute',
      licText: 'BDS, Oral pathology, Dentistry',
      fromYear: '2022',
      fromMonth: 'Jun',
    },
    {
      licNo: 'D.Y. Patil College Of Dental Institute',
      licText: 'BDS, Oral pathology, Dentistry',
      fromYear: '2022',
      fromMonth: 'June',
      toYear: '2023',
      toMonth: 'Aug',
    },
    {
      licNo: 'D.Y. Patil College Of Dental Institute ,,;e.plerf0ri9ejfijr89j9jefi8dhu7hr',
      licText: 'BDS, Oral pathology, Dentistry',
      fromYear: '2022',
      fromMonth: 'July',
    },
    {
      licNo: 'D.Y. Patil College Of Dental Institute',
      licText: 'BDS, Oral pathology, Dentistry',
      fromYear: '2022',
      fromMonth: 'June',
      toYear: '2023',
      toMonth: 'Aug',
    },
    // Add more education entries as needed
  ];

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const [showAllExp, setShowAllExp] = useState(false);

  const toggleShowAllExp = () => {
    setShowAllExp(!showAllExp);
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const [buttonState, setButtonState] = useState('Connect');
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);

  const handleConnectPress = () => {
    if (buttonState === 'Connect') {
      setButtonState('Options');
    } else {
      setButtonState('Connect');
    }
  };

  const handleOptionPress = (option) => {
    if (option === 'Empanel') {
      setButtonState('Remove');
    } else {
      // Handle Message button press
    }
  };

  const [showAllVid, setShowAllVid] = useState(false);
  const videos = [
    { id: 1, link: 'https://www.youtube.com/watch?v=video1' },
    { id: 2, link: 'https://www.youtube.com/watch?v=video2' },
    { id: 3, link: 'https://www.youtube.com/watch?v=video3' },
  ];
  const initialVideosToShow = showAllVid ? videos.length : 2;

  const handleToggleShowAllVid = () => {
    setShowAllVid(!showAllVid);
  };

  const [showAllAwards, setShowAllAwards] = useState(false);
  const awards = [
    { id: 1, link: 'https://www.youtube.com/watch?v=video1' },
    { id: 2, link: 'https://www.youtube.com/watch?v=video2' },
    { id: 3, link: 'https://www.youtube.com/watch?v=video3' },
  ];
  const initialAwardsToShow = showAllAwards ? awards.length : 2;

  const handleToggleShowAllAwards = () => {
    setShowAllAwards(!showAllAwards);
  };

  const [showAllBlog, setShowAllBlog] = useState(false);
  const blog = [
    { id: 1, link: 'https://www.youtube.com/watch?v=video1' },
    { id: 2, link: 'https://www.youtube.com/watch?v=video2' },
    { id: 3, link: 'https://www.youtube.com/watch?v=video3' },
  ];
  const initialBlogToShow = showAllBlog ? blog.length : 2;

  const handleToggleShowAllBlog = () => {
    setShowAllBlog(!showAllBlog);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <View>
            <Video
              source={{ uri: 'https://www.denxgen.com/images/clinic-page/video-11.mp4' }} // Replace with the actual video URL
              style={{ aspectRatio: 3 / 2 }}
              controls={false}
              resizeMode="contain"
            />
            <View style={styles.imageGrid}>
              {/* Gallery Images */}
              {[1, 2, 3, 4, 5].map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.imageContainer,
                    (index + 1) % 3 !== 0 && { marginRight: '5%' }, // Apply marginRight for every third image
                  ]}
                  onPress={() => toggleModal(index)}
                  activeOpacity={0.8}>
                  <Image
                    source={{
                      uri: 'https://www.denxgen.com/images/clinic-page/img/clinic-12.jpg',
                    }}
                    style={styles.defaultImageU}
                  />
                </TouchableOpacity>
              ))}

              {/* Modal for Full Screen Image */}
              <Modal
                visible={isModalVisible}
                transparent={true}
                onRequestClose={closeModal}>
                <TouchableWithoutFeedback onPress={closeModal}>
                  <View
                    style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <ScrollView
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      onMomentumScrollEnd={event => {
                        const newIndex = Math.round(
                          event.nativeEvent.contentOffset.x / width,
                        );
                        setSelectedImageIndex(newIndex);
                      }}
                      contentContainerStyle={{ flexGrow: 1 }}>
                      {[1, 2, 3, 4, 5, 6].map((image, index) => (
                        <View key={index} style={{ flex: 1, width: width }}>
                          <Image
                            source={{
                              uri: 'https://www.denxgen.com/images/clinic-page/img/clinic-12.jpg',
                            }}
                            style={{
                              width: width,
                              height: height,
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                      ))}
                    </ScrollView>
                    <TouchableOpacity
                      style={{ position: 'absolute', top: 20, right: 20 }}
                      onPress={closeModal}>
                      <Text style={{ color: 'FEFCFC', fontSize: 20 }}>X</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>


          </View>
        );
      case 1:
        return (
          <View>
            <FlatList
              data={servicesData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                  <Image
                    source={require('../../assets/img/services.png')}
                    style={{ width: 20, height: 25, marginRight: 10 }}
                  />
                  <Text style={[commonStyles.headerText3BL, {}]}>{item}</Text>
                </View>
              )}
            // renderItem={({ item }) => <Text style={[commonStyles.headerText3BL, {}]}>{item}</Text>}
            />
          </View>
        );
      case 2:
        return (
          <View>
            <View>
              <Text style={[commonStyles.headerText11BL, {
                //marginVertical: height * 0.01,
              }]}>Video Links</Text>
              {videos.slice(0, initialVideosToShow).map((video) => (

                <View key={video.id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Image
                    source={require('../../assets/img/videoL.png')}
                    style={{ width: 22, height: 22, marginRight: 10 }}
                  />
                  <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>{video.link}</Text>
                </View>
              ))}
              {!showAllVid && (
                <TouchableOpacity onPress={handleToggleShowAllVid}>
                  <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View More</Text>
                </TouchableOpacity>
              )}
              {showAllVid && (
                <TouchableOpacity onPress={handleToggleShowAllVid}>
                  <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View Less</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.horizontalLine}></View>
            <View>
              <Text style={[commonStyles.headerText11BL, {
                //marginVertical: height * 0.01,
              }]}>Awards</Text>
              {awards.slice(0, initialAwardsToShow).map((awards) => (

                <View key={awards.id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Image
                    source={require('../../assets/img/videoL.png')}
                    style={{ width: 22, height: 22, marginRight: 10 }}
                  />
                  <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>{awards.link}</Text>
                </View>
              ))}
              {!showAllAwards && (
                <TouchableOpacity onPress={handleToggleShowAllAwards}>
                  <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View More</Text>
                </TouchableOpacity>
              )}
              {showAllAwards && (
                <TouchableOpacity onPress={handleToggleShowAllAwards}>
                  <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View Less</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.horizontalLine}></View>
            <View>
              <Text style={[commonStyles.headerText11BL, {
                //marginVertical: height * 0.01,
              }]}>Blog Links</Text>
              {blog.slice(0, initialBlogToShow).map((blog) => (

                <View key={blog.id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Image
                    source={require('../../assets/img/videoL.png')}
                    style={{ width: 22, height: 22, marginRight: 10 }}
                  />
                  <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>{blog.link}</Text>
                </View>
              ))}
              {!showAllBlog && (
                <TouchableOpacity onPress={handleToggleShowAllBlog}>
                  <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View More</Text>
                </TouchableOpacity>
              )}
              {showAllBlog && (
                <TouchableOpacity onPress={handleToggleShowAllBlog}>
                  <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View Less</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      case 3:
        return (
          <View>
            <Text>Content for Tab 6</Text>
          </View>
        );
      case 4:
        return (
          <View>
            <Text>Content for Tab 6</Text>
          </View>
        );
      case 5:
        return (
          <View>
            <Text>Content for Tab 6</Text>
          </View>
        );
      default:
        return null;
    }
  };


  const [modalVisible, setModalVisible] = useState(false);

  // Function to toggle the modal visibility
  const toggleModalB = () => {
    setModalVisible(!modalVisible);
  };

      const [modalConnectVisible, setModalConnectVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      {/* SubContainer with Banner-like Image */}
      <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/img/banner.png')}
          style={styles.bannerImage}
        >
          <View style={styles.container1}>
            <View style={commonStyles.wrapT}>
              <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8}
                onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../assets/img/Back.png')}
                  style={commonStyles.icon}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={commonStyles.backContainer1}
                onPress={() => setShowPopover(true)}
              >
                <Image
                  source={require('../../assets/img/Option.png')}
                  style={commonStyles.icon}
                />
              </TouchableOpacity> */}

              {/* <Popover isVisible={showPopover} onRequestClose={() => setShowPopover(false)}
                placement={PopoverPlacement.BOTTOM}>
                <Text>This popover will stay centered on the screen, even when the device is rotated!</Text>
              </Popover> */}

              <Popover
                placement={PopoverPlacement.LEFT}
                from={(
                  <TouchableOpacity
                    style={commonStyles.backContainer1}
                  >
                    <Image
                      source={require('../../assets/img/Option.png')}
                      style={commonStyles.icon}
                    />
                  </TouchableOpacity>
                )}>
                <View style={styles.popover}>
                  <TouchableOpacity>
                    <View style={styles.popoverItemContainer}>
                      <Image
                        source={require('../../assets/img/Bookmark.png')}
                        style={styles.popoverItemIcon}
                      />
                      <Text style={styles.popoverItemText}>Save PDF</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <View style={styles.popoverItemContainer}>
                      <Image
                        source={require('../../assets/img/SaveCon.png')}
                        style={styles.popoverItemIcon}
                      />
                      <Text style={styles.popoverItemText}>Save Contact</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <View style={styles.popoverItemContainer}>
                      <Image
                        source={require('../../assets/img/Spam.png')}
                        style={styles.popoverItemIcon}
                      />
                      <Text style={styles.popoverItemText}>Report Spam</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.popoverItemContainer}>
                      <Image
                        source={require('../../assets/img/Link.png')}
                        style={styles.popoverItemIcon}
                      />
                      <Text style={styles.popoverItemText}>Copy Link</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Popover>
            </View>
          </View>
          <View style={styles.profilePicContainer}>

            <Image
              source={require('../../assets/img/ProfileHome.png')}
              style={styles.profilePic}
            />
          </View>
          <View></View>
          <View style={styles.textContainer}>
            <Text style={[commonStyles.headerText1BL, {}]} adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="tail">Naina Swaroop</Text>
            <Text style={[commonStyles.headerText2BL, {
              marginVertical: 3,
            }]} numberOfLines={1} ellipsizeMode="tail">MDS,BDS l Prosthodontics l 10+ years exp</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
              <Image source={require('../../assets/img/LocationHome.png')} style={{ width: 15, height: 15, }} />
              <Text style={[commonStyles.headerText5BL, {
                paddingHorizontal: 8,
                lineHeight: 18

              }]}>Vikhroli, Prosthodntic Care, Mumbai</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
              <Image source={require('../../assets/img/languages.png')} style={{ width: 15, height: 15, }} />
              <Text style={[commonStyles.headerText5BL, {
                paddingHorizontal: 8,
                lineHeight: 15

              }]}>English, Hindi, Marathi</Text>
            </View>
            <View>

            </View>
            {/* <Popover
                placement={PopoverPlacement.LEFT}
                from={(
                  <TouchableOpacity
                    style={commonStyles.backContainer1}
                  >
                    <Image
                      source={require('../../assets/img/Option.png')}
                      style={commonStyles.icon}
                    />
                  </TouchableOpacity>
                )}>
                <View style={styles.popover}>
                  <TouchableOpacity>
                    <View style={styles.popoverItemContainer}>
                      <Image
                        source={require('../../assets/img/Bookmark.png')}
                        style={styles.popoverItemIcon}
                      />
                      <Text style={styles.popoverItemText}>Save PDF</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <View style={styles.popoverItemContainer}>
                      <Image
                        source={require('../../assets/img/SaveCon.png')}
                        style={styles.popoverItemIcon}
                      />
                      <Text style={styles.popoverItemText}>Save Contact</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <View style={styles.popoverItemContainer}>
                      <Image
                        source={require('../../assets/img/Spam.png')}
                        style={styles.popoverItemIcon}
                      />
                      <Text style={styles.popoverItemText}>Report Spam</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.popoverItemContainer}>
                      <Image
                        source={require('../../assets/img/Link.png')}
                        style={styles.popoverItemIcon}
                      />
                      <Text style={styles.popoverItemText}>Copy Link</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Popover> */}
          </View>

        </ImageBackground>
        <View style={styles.subContainer1}>
          <View style={styles.horizontalLine}></View>
          <View style={styles.containerC}>
            {/* Left content */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[commonStyles.headerText3BL, { paddingRight: 8 }]}>
                Key Associate
              </Text>
              <Text style={[commonStyles.headerText5G, { textAlign: 'center' }]}>
                (150+)
              </Text>
            </View>

            <View style={styles.verticleLine}></View>

            {/* Right content */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Connections')}
                style={{ flexDirection: 'row', alignItems: 'center', }}
              >
                <Text style={[commonStyles.headerText3BL, { paddingRight: 8 }]}>
                  Connection
                </Text>
                <Text style={[commonStyles.headerText5G, { textAlign: 'center' }]}>
                  (100)
                </Text>
              </TouchableOpacity>
            </View>
          </View>



          <View style={styles.horizontalLine}></View>

          {/* <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity> */}
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              {buttonState === 'Connect' && (
                <TouchableOpacity
                  style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01, }]}
                  // onPress={handleConnectPress}
                  onPress={() => setShowPopup1(true)}
                  activeOpacity={0.8}
                >
                  <Text style={commonStyles.buttonTextS}>Connect</Text>
                </TouchableOpacity>
              )}

              {buttonState === 'Options' && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: height * 0.01 }}>
                  {/* <TouchableOpacity
                    style={[commonStyles.buttonS1, { marginRight: height * 0.01 }]}
                    onPress={() => handleOptionPress('Message')}
                    activeOpacity={0.8}
                  >
                    <Text style={commonStyles.buttonTextS1}>Message</Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    style={commonStyles.buttonS}
                    //onPress={() => handleOptionPress('Emphasize')}
                    onPress={() => setShowPopup(true)}
                    activeOpacity={0.8}
                  >
                    <Text style={commonStyles.buttonTextS}>Empanel</Text>
                  </TouchableOpacity>
                </View>
              )}

              {buttonState === 'Remove' && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: height * 0.01 }}>
                  {/* <TouchableOpacity
                    style={[commonStyles.buttonS1, { marginRight: height * 0.01 }]}
                    onPress={() => handleOptionPress('Message')}
                    activeOpacity={0.8}
                  >
                    <Text style={commonStyles.buttonTextS1}>Message</Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    style={commonStyles.buttonS1}
                    onPress={handleConnectPress}
                    activeOpacity={0.8}
                  >
                    <Text style={commonStyles.buttonTextS1}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TouchableOpacity
                style={[commonStyles.buttonS, { marginLeft: height * 0.01 }]}
              activeOpacity={0.8}
            >
              <Text style={commonStyles.buttonTextS}>Key Associate</Text>
            </TouchableOpacity>
</View>
            <AlertPopup
              visible={showPopup1}
              onRequestClose={() => setShowPopup1(false)}
              title="Connection Request"
              message="Do you send Dr. Mridula Radhakrishnan connection request? "
              yesLabel="Send"
              noLabel="Cancel"
              onYesPress={() => {
                setShowPopup1(false);
                handleConnectPress();
              }}
            />

            <AlertPopup
              visible={showPopup}
              onRequestClose={() => setShowPopup(false)}
              title="Empanelment Request"
              message="Do you send Dr. Mridula Radhakrishnan empanelment request? "
              yesLabel="Send"
              noLabel="Cancel"
              onYesPress={() => {
                setShowPopup(false);
                handleOptionPress('Empanel');
              }}
            />

            {/* <View style={{ flexDirection: 'row', marginVertical: height * 0.005 }}>
              <TouchableOpacity
                style={[commonStyles.buttonS, { marginRight: height * 0.01 }]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Text style={commonStyles.buttonTextS}>Edit profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[commonStyles.buttonS, {}]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Explore')}
              >
                <Text style={commonStyles.buttonTextS}>Discover</Text>
              </TouchableOpacity>
            </View> */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setModalConnectVisible(true)}>
                <Image source={require('../../assets/img/connections.png')} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <Image source={require('../../assets/img/Option.png')} style={{ width: 20, height: 20, marginLeft: width * 0.02 }} />
            </View>
          </View>
          <Modal visible={modalConnectVisible} transparent>
            <TouchableWithoutFeedback onPress={() => setModalConnectVisible(false)}>
              <View style={styles.modalContainer}>
                <TouchableWithoutFeedback>
                  <ScrollView style={styles.modalContent}>
                    <View style={styles.horizontalLineM}></View>
                    <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                      Contact Information
                    </Text>
                    <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                      Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                    </Text>
                    <View>
                      <SocialLink platform="contact" username="9876543210" />
                      <SocialLink platform="email" username="wedeveloptech@gmail.com" />
                      <SocialLink platform="instagram" username="_wedeveloptech_" />
                      <SocialLink platform="whatsapp" username="9876543210" />
                      <SocialLink platform="linkedin" username="wedeveloptech" />
                      <SocialLink platform="facebook" username="wedeveloptech" />
                      <SocialLink platform="website" username="https://www.wedeveloptech.com/" />
                    </View>
                  </ScrollView>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>



          <View style={styles.horizontalLine}></View>

          <View style={styles.containerButton}>
            {/* ScrollView to contain the buttons */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Button 1 */}
              <TouchableOpacity style={styles.buttonM} activeOpacity={0.8} onPress={toggleModalB}>
                <Text style={[commonStyles.buttonText2H, {}]}>My Clinic</Text>
                <Image source={require('../../assets/img/dropdown.png')} style={styles.imageStyle1} />
              </TouchableOpacity>
              {/* Button 2 */}
              <TouchableOpacity style={styles.buttonM} activeOpacity={0.8} onPress={toggleModalB}>
                <Text style={[commonStyles.buttonText2H, {}]}>Empanelled Clinic</Text>
                <Image source={require('../../assets/img/dropdown.png')} style={styles.imageStyle1} />
              </TouchableOpacity>
              {/* Button 3 */}
              <TouchableOpacity style={styles.buttonM} activeOpacity={0.8} onPress={toggleModalB}>
                <Text style={[commonStyles.buttonText2H, {}]}>My Office</Text>
                <Image source={require('../../assets/img/dropdown.png')} style={styles.imageStyle1} />
              </TouchableOpacity>
              {/* Button 4 */}
              <TouchableOpacity style={styles.buttonM} activeOpacity={0.8} onPress={toggleModalB}>
                <Text style={[commonStyles.buttonText2H, {}]}>Associated Offices</Text>
                <Image source={require('../../assets/img/dropdown.png')} style={styles.imageStyle1} />
              </TouchableOpacity>
            </ScrollView>

            {/* Modal component */}
            <Modal visible={modalVisible} transparent>
              <TouchableWithoutFeedback onPress={() => toggleModalB()}>
                <View style={styles.modalContainer}>
                  <TouchableWithoutFeedback>
                    <ScrollView style={styles.modalContent}>
                      <View style={styles.horizontalLineM}></View>
                      <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                        My Clinics
                      </Text>
                      <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                        Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                      </Text>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 9,
                          borderWidth: 0.5,
                          borderRadius: 8,
                          borderColor: '#979797',
                          marginBottom: 16,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          //height: 80,
                          paddingVertical: 8,
                          backgroundColor: '#FEFCFC'
                        }}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('ClinicProfile')}
                      >
                        {/* Left side image and text */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={require('../../assets/img/clinicDefault.jpg')} style={styles.profileImage} />
                          <View style={{ flex: 1, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                              <Text style={[commonStyles.headerText2BL, { lineHeight: 20}]} numberOfLines={1}>Bhaskar Dental Clinic</Text>
                              {/* Add your popover component here */}
                            </View>

                            <Text style={[commonStyles.headerText5G, {
                              marginVertical: height * 0.01,
                            }]} numberOfLines={1}>Implants to Cosmetics</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>

                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../assets/img/Location.png')} style={{ width: 10, height: 12 }} />
                                <Text style={[commonStyles.headerText5BL, {
                                  marginLeft: 4,
                                }]} numberOfLines={1}>Ghatkopar, India</Text>
                              </View>
                            </View>

                            {/* Add more texts or components if needed */}
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 9,
                          borderWidth: 0.5,
                          borderRadius: 8,
                          borderColor: '#979797',
                          marginBottom: 16,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          //height: 80,
                          paddingVertical: 8,
                          backgroundColor: '#FEFCFC'
                        }}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('ClinicProfile')}
                      >
                        {/* Left side image and text */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={require('../../assets/img/clinicDefault1.jpg')} style={styles.profileImage} />
                          <View style={{ flex: 1, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                              <Text style={[commonStyles.headerText2BL, { lineHeight: 20 }]} numberOfLines={1}>Bhaskar Dental Clinic</Text>
                              {/* Add your popover component here */}
                            </View>

                            <Text style={[commonStyles.headerText5G, {
                              marginVertical: height * 0.01,
                            }]} numberOfLines={1}>Implants to Cosmetics</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>

                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../assets/img/Location.png')} style={{ width: 10, height: 12 }} />
                                <Text style={[commonStyles.headerText5BL, {
                                  marginLeft: 4,
                                }]} numberOfLines={1}>Ghatkopar, India</Text>
                              </View>
                            </View>

                            {/* Add more texts or components if needed */}
                          </View>
                        </View>
                      </TouchableOpacity>
                    </ScrollView>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.aboutContainer}>
            <Text style={[commonStyles.headerText11BL, {
              marginVertical: height * 0.01,
            }]}>About</Text>
            {/* <View>
              <Text style={[commonStyles.headerText3BL, {
                textAlign:'justify'
              }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            </View> */}
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ReadMoreText
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                initialLimit={120}
              />
            </View>
          </View>
          {/* <View style={styles.horizontalLine}></View> */}
          {/* <View style={styles.aboutContainer}>
                        <Text style={[commonStyles.headerText11BL, {
                            //marginVertical: height * 0.01,
                        }]}>Contact Info</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={styles.licenceContainer2}>
                                <Image
                                    source={require('../../assets/img/mailP.png')}
                                    style={commonStyles.icon}
                                />
                            </View>
                            <View style={{ marginLeft: 15, alignSelf: 'center' }}>
                                <Text style={[commonStyles.headerText4BL]}>nehaparma@gmail.com</Text>
                                <Text style={[commonStyles.headerText5G]}>Email</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={styles.licenceContainer2}>
                                <Image
                                    source={require('../../assets/img/contactP1.png')}
                                    style={commonStyles.icon}
                                />
                            </View>
                            <View style={{ marginLeft: 15, alignSelf: 'center' }}>
                                <Text style={[commonStyles.headerText4BL]}>+91 9876543210</Text>
                                <Text style={[commonStyles.headerText5G]}>Phone Number</Text>
                            </View>
                        </View>
                    </View> */}
          <View style={styles.horizontalLine}></View>
          <View style={[styles.aboutContainer, { marginBottom: 10 }]}>
            <Text style={[commonStyles.headerText11BL, {
              //marginVertical: height * 0.01,
            }]}>Licence Number</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>

              <View style={{ alignSelf: 'center' }}>
                <Text style={[commonStyles.headerText2BL]}>200/05/2318</Text>
                {/* <Text style={styles.licText}>Andhra Pradesh State Dental Council</Text> */}
              </View>
            </View>
          </View>
          <View style={[styles.aboutContainer, {}]}>
            <Text style={[commonStyles.headerText11BL, {
              //marginVertical: height * 0.01,
            }]}>Registration Number</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>

              <View style={{ alignSelf: 'center' }}>
                <Text style={[commonStyles.headerText2BL]}>A19965</Text>
                {/* <Text style={styles.licText}>Andhra Pradesh State Dental Council</Text> */}
              </View>
            </View>
          </View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.aboutContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[commonStyles.headerText11BL, {
                //marginVertical: height * 0.01,
              }]}>Educational Details</Text>
            </View>

            {educationData.slice(0, showAll ? educationData.length : 2).map((education, index) => (
              <View key={index} style={{ flexDirection: 'row', marginVertical: 10 }}>
                <View style={styles.licenceContainer}>
                  <Image
                    source={require('../../assets/img/Education11.png')}
                    style={commonStyles.icon}
                  />
                </View>
                <View style={{ marginHorizontal: 20, alignSelf: 'center', paddingRight:20 }}>
                  <Text style={[commonStyles.headerText4BL]}>{education.licNo}</Text>
                  <Text style={[commonStyles.headerText5G]}>{education.licText}</Text>
                </View>
              </View>
            ))}

            {!showAll && educationData.length > 2 && (
              <View>
                {/* <View style={styles.horizontalLine}></View> */}
                <TouchableOpacity style={styles.uploadButtonS} onPress={toggleShowAll} activeOpacity={0.8}>
                  <Text style={commonStyles.buttonText1}>Show all {educationData.length} educations </Text>
                  <Image source={require('../../assets/img/RightArrow.png')} style={styles.imageStyle} />
                </TouchableOpacity>
              </View>

            )}
            {showAll && (
              <TouchableOpacity style={styles.uploadButtonS} onPress={toggleShowAll} activeOpacity={0.8}>
                <Text style={commonStyles.buttonText1}>Hide all educations</Text>
                <Image source={require('../../assets/img/RightArrow.png')} style={styles.imageStyle} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.horizontalLine}></View>
          <View>
            <View style={styles.aboutContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[commonStyles.headerText11BL, {
                  //marginVertical: height * 0.01,
                }]}>Experience</Text>
              </View>

              {experienceData.slice(0, showAllExp ? experienceData.length : 2).map((experiences, index) => (
                <View key={index} style={{ flexDirection: 'row', marginVertical: 10 }}>
                  <View style={styles.licenceContainer1}>
                    <Image
                      source={require('../../assets/img/Experience11.png')}
                      style={commonStyles.icon}
                    />
                  </View>
                  <View style={{ marginHorizontal: 20, alignSelf: 'center', paddingRight: 20 }}>
                    <Text style={[commonStyles.headerText4BL]}>{experiences.licNo}</Text>
                    <Text style={[commonStyles.headerText5G]}>{experiences.licText}</Text>
                  </View>
                </View>
              ))}

              {!showAllExp && experienceData.length > 2 && (
                <View>
                  {/* <View style={styles.horizontalLine}></View> */}
                  <TouchableOpacity style={styles.uploadButtonS} onPress={toggleShowAllExp} activeOpacity={0.8}>
                    <Text style={commonStyles.buttonText1}>Show all {experienceData.length} experiences </Text>
                    <Image source={require('../../assets/img/RightArrow.png')} style={styles.imageStyle} />
                  </TouchableOpacity>
                </View>

              )}
              {showAllExp && (
                <TouchableOpacity style={styles.uploadButtonS} onPress={toggleShowAllExp} activeOpacity={0.8}>
                  <Text style={commonStyles.buttonText1}>Hide all experiences</Text>
                  <Image source={require('../../assets/img/RightArrow.png')} style={styles.imageStyle} />
                </TouchableOpacity>
              )}
            </View>

          </View>
          <View style={styles.horizontalLine}></View>

             <View style={styles.staticButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 0 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(0)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.tabText, selectedTab === 0 && styles.selectedTabText]}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 1 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(1)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.tabText, selectedTab === 1 && styles.selectedTabText]}>Services</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 2 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(2)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.tabText, selectedTab === 2 && styles.selectedTabText]}>Publications</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bottom section to show selected tab content */}
                    <View style={styles.selectedTabContent}>
                        {/* Render selected tab content */}
                        {renderTabContent()}
                    </View>

                    


          {/* Tabs */}
          {/* <ScrollView style={styles.tabContainer} horizontal showsHorizontalScrollIndicator={false} >
            <TouchableOpacity
              style={[styles.tabItem, selectedTab === 0 && styles.selectedTabItem]}
              onPress={() => setSelectedTab(0)}
              activeOpacity={0.8}
            >
              {selectedTab === 0 ? (
                <Image source={require('../../assets/img/gallery-white.png')} style={styles.tabImage} />
              ) : (
                <Image source={require('../../assets/img/gallery-blue.png')} style={styles.tabImage} />
              )}
              <Text style={[styles.tabText, selectedTab === 0 && styles.selectedTabText]}>Social Media</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, selectedTab === 1 && styles.selectedTabItem]}
              onPress={() => setSelectedTab(1)}
              activeOpacity={0.8}
            >
              {selectedTab === 1 ? (
                <Image source={require('../../assets/img/gallery-white.png')} style={styles.tabImage} />
              ) : (
                <Image source={require('../../assets/img/gallery-blue.png')} style={styles.tabImage} />
              )}
              <Text style={[styles.tabText, selectedTab === 1 && styles.selectedTabText]}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, selectedTab === 2 && styles.selectedTabItem]}
              onPress={() => setSelectedTab(2)}
              activeOpacity={0.8}
            >
              {selectedTab === 2 ? (
                <Image source={require('../../assets/img/gallery-white.png')} style={styles.tabImage} />
              ) : (
                <Image source={require('../../assets/img/gallery-blue.png')} style={styles.tabImage} />
              )}
              <Text style={[styles.tabText, selectedTab === 2 && styles.selectedTabText]}>Publications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, selectedTab === 3 && styles.selectedTabItem]}
              onPress={() => setSelectedTab(3)}
              activeOpacity={0.8}
            >
              {selectedTab === 3 ? (
                <Image source={require('../../assets/img/gallery-white.png')} style={styles.tabImage} />
              ) : (
                <Image source={require('../../assets/img/gallery-blue.png')} style={styles.tabImage} />
              )}
              <Text style={[styles.tabText, selectedTab === 3 && styles.selectedTabText]}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, selectedTab === 4 && styles.selectedTabItem]}
              onPress={() => setSelectedTab(4)}
              activeOpacity={0.8}
            >
              {selectedTab === 4 ? (
                <Image source={require('../../assets/img/gallery-white.png')} style={styles.tabImage} />
              ) : (
                <Image source={require('../../assets/img/gallery-blue.png')} style={styles.tabImage} />
              )}
              <Text style={[styles.tabText, selectedTab === 4 && styles.selectedTabText]}>More</Text>
            </TouchableOpacity>

          </ScrollView> */}

          {/* Render selected tab content */}
          {/* {renderTabContent()} */}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  staticButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
    paddingVertical: 1,
    marginBottom: height * 0.03,
    borderWidth: 1, // Add border top
    borderColor: '#ccc', // Border color
    borderRadius: 10,
    marginTop: 2
  },
  selectedTabText: {
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 5,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'DMSans-Medium',
    lineHeight: height * 0.028 //28
  },
  tabImage: {
    width: 17,
    height: 15,
  },
  tabText: {
    fontSize: 15,
    alignSelf: 'center',
    color: '#121212',
    paddingHorizontal: 5,
    textAlign: 'center',
    fontFamily: 'DMSans-Medium',
    paddingVertical: 1,
    lineHeight: height * 0.028 //28
  },
  selectedTabItem: {
    height: height * 0.04,
    flexDirection: 'row',
    backgroundColor: '#289EF5',
    opacity: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.005,
    marginRight: 12,  // Adjust this value
    paddingHorizontal: height * 0.01,
    paddingVertical: 1,
    //marginBottom: height * 0.03,
  },
  tabItem: {
    height: height * 0.04,
    flexDirection: 'row',
    //backgroundColor: '#E8F8FF',
    opacity: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.005,
    paddingHorizontal: height * 0.01,
    //marginBottom: height * 0.03,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageStyle: {
    width: 17,
    height: 15,
    marginLeft: 10
  },
  imageStyle1: {
    width: 20,
    height: 15,
    marginLeft: 5
  },
  uploadButtonS: {
    //padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextU: {
    color: '#289EF5',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Mukta-SemiBold',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FEFCFC',
    //paddingVertical: 6,
    //paddingHorizontal: 20
  },
  container1: {
    paddingHorizontal: 20,
    marginTop: 10
  },
  subContainer: {
    //marginTop: 6,
    //marginBottom: 30
  },
  subContainer1: {
    marginTop: 140,
    paddingHorizontal: 16,
  },
  bannerImage: {
    width: '100%',
    height: 141, // Adjust the height as needed
    resizeMode: 'cover',
    position: 'relative',
  },
  profilePicContainer: {
    position: 'absolute',
    top: '40%', // Adjust this value to control the overlap
    left: 20, // Adjust this value to control the position
    borderWidth: 3,
    borderColor: '#FEFCFC',
    borderRadius: 75, // Half of the width and height to make it circular
    overflow: 'hidden',
  },
  profilePic: {
    width: 110,
    height: 110,
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    top: '130%',
    left: 0,
    right: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,// Adjust the background color and opacity
  },
  titleText: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Mukta-Bold',
    lineHeight: 30,
  },
  subtitleText: {
    color: '#000',
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Mukta-Medium'
  },
  collapsedText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Mukta-Regular',
    lineHeight: 21,
  },
  collapsedTextT: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Mukta-Regular',
  },
  subtitle1Text: {
    color: '#000',
    fontSize: 14,
  },
  button: {
    alignSelf: 'center',
    height: height * 0.06,
    width: width * 0.9,
    backgroundColor: "#289EF5",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,

  },
  buttonR: {
    alignSelf: 'center',
    height: height * 0.06,
    width: width * 0.43,
    backgroundColor: "#289EF5",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,

  },
  buttonRE: {
    alignSelf: 'center',
    height: height * 0.06,
    width: width * 0.43,
    backgroundColor: "#FFF",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#289EF5",
    borderWidth: 1

  },
  buttonM: {
    //alignSelf: 'center',
    // height: height * 0.06,
    // backgroundColor: "#FFF",
    // borderRadius: 8,
    // borderBottomLeftRadius: 10,
    // //justifyContent: "center",
    // alignItems: "center",
    // marginVertical: 10,
    flexDirection: 'row',
    // paddingLeft: 10, // Adjust this value as needed for spacing
    alignSelf: 'center',
    //height: moderateScale(16),
    backgroundColor: "#FFF",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: '#979797',
    borderWidth: 0.5,
    paddingVertical: moderateScale(6),
    paddingLeft: width * 0.05,
    paddingRight: width * 0.03,
    marginRight: 10
  },
  buttonTextM: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Mukta-Regular',
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Mukta-Bold',
  },
  buttonTextE: {
    color: '#289EF5',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Mukta-Bold',
  },
  rowsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '18%', // Adjust the width as needed
    marginBottom: 10,
  },
  rowImage: {
    width: 47,
    height: 47,
    borderRadius: 30, // Half of the width and height to make it circular
    marginBottom: 5,
  },
  rowName: {
    color: '#000',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Mukta-Regular',
    textAlign: 'center',
  },
  containerC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10// Add horizontal padding to ensure elements don't stick to the edges
  },
  verticleLine: {
    height: '80%', // Adjust height as needed
    width: 1,
    backgroundColor: '#979797',
    //marginHorizontal: moderateScale(10), // Add horizontal margin to space it out from text
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    marginVertical: 12,
    //marginHorizontal: 10,
    backgroundColor: '#979797',
  },
  aboutContainer: {
    marginVertical: 2
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginBottom: 5,
    fontFamily: 'Mukta-Medium',
  },
  licenceContainer: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //marginTop: 10
  },
  licenceContainer1: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //marginTop: 10
  },
  licenceContainer2: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //marginTop: 10
  },
  licNo: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Mukta-Medium',
    lineHeight: 21,
  },
  licText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Mukta-Regular',
    lineHeight: 21,
  },
  licText1: {
    fontSize: 12,
    color: '#979797',
    fontFamily: 'Mukta-Regular',
    lineHeight: 21,
  },
  licA: {
    fontSize: 14,
    color: '#494949',
    lineHeight: 19,
    fontFamily: 'Mukta-Regular',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end', // Change from 'center' to 'flex-end'
    alignItems: 'center',
  },
  containerButton: {
    marginVertical: height * 0.01,
  },
  // modalContainer: {
  //     width: '100%',
  //     maxHeight: '90%',
  //     backgroundColor: '#FFFFFF',
  //     borderRadius: 10,
  //     padding: 20,
  //     alignSelf: 'flex-end', // Set to 'flex-end' to start the modal from the bottom
  // },

  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalTextarea: {
    height: 134,
    borderColor: '#979797',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  modalTextareaContainer: {
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#289EF5',
    marginHorizontal: 55,
    borderRadius: 100,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,

  },
  addButton: {
    alignSelf: 'flex-end',  // Align to the right side
    marginBottom: 10,  // Add spacing if needed
  },
  addButtonText: {
    color: '#289EF5',  // Use a color that fits your design
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Mukta-Regular',
  },
  inputContainerC: {
    borderRadius: 24,
    backgroundColor: 'transparent',
    height: 54,
    flexDirection: 'row'
  },
  modalHeaderText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Mukta-Bold',
    marginLeft: 10,
    marginBottom: 10
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#979797',
    borderTopColor: '#979797'
  },
  toggleLabel: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Mukta-Bold',
  },

  toggleButton: {
    padding: 10,
  },
  toggleIcon: {
    width: 24,
    height: 24,
  },
  dropdownContainer: {
    //justifyContent: 'center',
    //alignSelf: 'center',
    position: 'relative',
    marginVertical: 10,

  },
  labelC: {
    fontSize: 16,
    color: '#000',
    marginRight: 5,
    fontFamily: 'Mukta-Bold',
    marginTop: 12
  },
  labelD: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Mukta-Bold',
  },
  yearDropdown: {
    borderWidth: 1,
    borderColor: '#F4F4F4',
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#F4F4F4', // Background color
    width: 100, // Adjust the width as needed
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
  },
  inputM: {
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#979797',

  },
  popover: {
    backgroundColor: '#FEFCFC',
    borderRadius: 10,
    paddingVertical: 8
  },
  popoverItemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 16
  },
  popoverItemIcon: {
    height: 18,
    width: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  popoverItemText: {
    fontSize: 15,
    color: '#121212',
    fontFamily: 'DMSans-Medium',
    lineHeight: height * 0.022, //28
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  imageContainer: {
    width: '30%',
    height: '30%',
    aspectRatio: 1,
    position: 'relative',
    marginVertical: 7,
  },
  defaultImageU: {
    flex: 1,
    width: '100%',
  },
  headerText3BL: {
    fontSize: 15,
    color: '#121212',
    fontFamily: 'DMSans-Medium',
    lineHeight: height * 0.022, //28
    marginTop: 20,
    paddingTop: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background blur effect
  },
  modalContent: {
    backgroundColor: '#FEFCFC',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%', // Maximum height of 50%
  },
  horizontalLineM: {
    width: '20%',
    height: 5,
    marginBottom: height * 0.03,
    //marginHorizontal: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#979797',
  },
  profileImage: {
    height: height * 0.09,
    width: height * 0.09,
    borderRadius: 36,
    marginRight: 10
  },
});

export default ProfileScreen;