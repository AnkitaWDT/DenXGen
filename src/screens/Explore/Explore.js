/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, PixelRatio, TouchableWithoutFeedback, Dimensions, TextInput, SafeAreaView } from 'react-native';
import commonStyles from '../../components/CommonStyles';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import Animation from '../../components/Loader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import Share from 'react-native-share';
import { useRoute } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import defaultMaleImage from '../../../assets/img/defaultM.png';
import defaultFemaleImage from '../../../assets/img/defaultF.png';

const { width, height } = Dimensions.get('window');
const responsiveFontSize = (size) => {
  const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const Explore = ({navigation, route}) => {
      const data = [
        // Data for Tab 1
        { id: 1, title: 'Ankita Iyer', description: 'Dental Technicians Bachelors in Dental Technicians', location: 'Ghatkopar, India', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', gender: 1 },
        { id: 2, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU', gender: 2 },
        { id: 3, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: null, gender: 1 },
        { id: 4, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', gender: 1 },
        { id: 5, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU', gender: 2 },
        { id: 6, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: null, gender: 2 },
        { id: 7, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', gender: 1 },
        { id: 8, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU', gender: 2 },
        { id: 9, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: null, gender: 1 },
        { id: 10, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', gender: 1 },
        { id: 11, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU', gender: 2 },
        { id: 12, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', location: 'Ghatkopar, India', img: null, gender: 2 },

    ];


  // useEffect(() => {
  //   requestContactsPermission();
  // }, [requestContactsPermission]);

  // const requestContactsPermission = useCallback(async () => {
  //   const status = await check(PERMISSIONS.ANDROID.READ_CONTACTS);

  //   if (status === RESULTS.GRANTED) {
  //     // Permission already granted, fetch contacts
  //     fetchContacts();
  //   } else {
  //     // Permission not granted, request permission
  //     const result = await request(PERMISSIONS.ANDROID.READ_CONTACTS);

  //     if (result === RESULTS.GRANTED) {
  //       // Permission granted, fetch contacts
  //       fetchContacts();
  //     } else {
  //       // Permission denied, handle accordingly
  //       console.log('Contacts permission denied');
  //     }
  //   }
  // }, []);


  const handleTabChange = async (index) => {
    setSelectedTab(index);

    if (index === 4) { // Check if the Contacts tab is selected
      const status = await check(PERMISSIONS.ANDROID.READ_CONTACTS);

      if (status !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.ANDROID.READ_CONTACTS);

        if (result !== RESULTS.GRANTED) {
          console.log('Contacts permission denied');
          // Handle permission denied case
          return;
        }
      }

      fetchContacts(); // Fetch contacts after permission granted
    }
  };

  const fetchContacts = () => {
    Contacts.getAll().then(contacts => {

      setContacts(contacts);
      contacts.forEach(contact => {
        console.log(contact);
        console.log(contact.displayName);
        console.log(contact.phoneNumbers);
      });
    })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  };

  const openContactDetails = (contact) => {
    console.log(JSON.stringify(contact));
    Contacts.openExistingContact(contact);
  };

  const { initialTab } = route.params || { initialTab: 0 };
  console.log(initialTab);
  const [selectedTab, setSelectedTab] = useState(initialTab || 0);
  // const [selectedTab, setSelectedTab] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data) before rendering the profile screen
    const fakeAsyncOperation = async () => {
      // Add any asynchronous logic here if needed
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Set loading state to false after the delay
      setIsLoading(false);
    };

    // Execute the fakeAsyncOperation
    fakeAsyncOperation();
  }, []);

  useEffect(() => {
    setSelectedTab(initialTab || 0);
  }, [initialTab]);

  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query state
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered); // Update filtered data state
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };


  const servicesData = ["Service 1", "Service 2", "Service 3"]; // Sample data for services

  const renderDefaultImage = (gender) => {
    return gender === 1 ? defaultMaleImage : defaultFemaleImage;
  };

  const renderTabContent = () => {
    
    switch (selectedTab) {
      case 0:
        return (
          <ScrollView nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: height * 0.5 }}
            showsVerticalScrollIndicator={false}>
            {/* List of items */}
            {filteredData.map((item) => (
              <TouchableOpacity
                key={item.id}
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
                onPress={() => navigation.navigate('ProfileScreen')}
              >
                {/* Left side image and text */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.img ? (
                    <Image source={{ uri: item.img }} style={styles.profileImage} />
                  ) : (
                    <Image source={renderDefaultImage(item.gender)} style={styles.profileImage} />
                  )}
                  <View style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <Text style={[commonStyles.headerText4BL, { lineHeight: 24, }]} numberOfLines={1}>{item.title}</Text>
                      <Popover
                        placement={PopoverPlacement.LEFT}
                        from={(
                          <TouchableOpacity
                          >
                            <Image
                              source={require('../../../assets/img/ViewM.png')}
                              style={{ width: 3, height: 13, marginRight: 5 }}
                            />
                          </TouchableOpacity>
                        )}>
                        <View style={commonStyles.popover}>
                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Bookmark.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Save PDF</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/SaveCon.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Save Contact</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Spam.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Report Spam</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Link.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Copy Link</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </Popover>
                    </View>

                    <Text style={[commonStyles.headerText5G, {
                      lineHeight: 22, marginRight: 50, 
                    }]} numberOfLines={1}>{item.description}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../assets/img/Location.png')} style={{ width: 10, height: 12 }} />
                        <Text style={[commonStyles.headerText5BL, {
                          marginLeft: 4, lineHeight: 22
                        }]} numberOfLines={1}>{item.location}</Text>
                      </View>
                    </View>

                    {/* Add more texts or components if needed */}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      case 1:
        return (
          <ScrollView nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: height * 0.5 }}
            showsVerticalScrollIndicator={false}>
            {/* List of items */}
            {filteredData.map((item) => (
              <TouchableOpacity
                key={item.id}
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
                onPress={() => navigation.navigate('ProfileScreen')}
              >
                {/* Left side image and text */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.img ? (
                    <Image source={{ uri: item.img }} style={styles.profileImage} />
                  ) : (
                    <Image source={renderDefaultImage(item.gender)} style={styles.profileImage} />
                  )}
                  <View style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <Text style={[commonStyles.headerText4BL, { lineHeight: 24, }]} numberOfLines={1}>{item.title}</Text>
                      <Popover
                        placement={PopoverPlacement.LEFT}
                        from={(
                          <TouchableOpacity
                          >
                            <Image
                              source={require('../../../assets/img/ViewM.png')}
                              style={{ width: 3, height: 13, marginRight: 5 }}
                            />
                          </TouchableOpacity>
                        )}>
                        <View style={commonStyles.popover}>
                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Bookmark.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Save PDF</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/SaveCon.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Save Contact</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Spam.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Report Spam</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Link.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Copy Link</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </Popover>
                    </View>

                    <Text style={[commonStyles.headerText5G, {
                      lineHeight: 22, marginRight: 50,
                    }]} numberOfLines={1}>{item.description}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../assets/img/Location.png')} style={{ width: 10, height: 12 }} />
                        <Text style={[commonStyles.headerText5BL, {
                          marginLeft: 4, lineHeight: 22
                        }]} numberOfLines={1}>{item.location}</Text>
                      </View>
                    </View>

                    {/* Add more texts or components if needed */}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      case 2:
        return (
          <ScrollView nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: height * 0.5 }}
            showsVerticalScrollIndicator={false}>
            {/* List of items */}
            {filteredData.map((item) => (
              <TouchableOpacity
                key={item.id}
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
                onPress={() => navigation.navigate('ProfileScreen')}
              >
                {/* Left side image and text */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.img ? (
                    <Image source={{ uri: item.img }} style={styles.profileImage} />
                  ) : (
                    <Image source={renderDefaultImage(item.gender)} style={styles.profileImage} />
                  )}
                  <View style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <Text style={[commonStyles.headerText4BL, { lineHeight: 24, }]} numberOfLines={1}>{item.title}</Text>
                      <Popover
                        placement={PopoverPlacement.LEFT}
                        from={(
                          <TouchableOpacity
                          >
                            <Image
                              source={require('../../../assets/img/ViewM.png')}
                              style={{ width: 3, height: 13, marginRight: 5 }}
                            />
                          </TouchableOpacity>
                        )}>
                        <View style={commonStyles.popover}>
                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Bookmark.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Save PDF</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/SaveCon.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Save Contact</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Spam.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Report Spam</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Link.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Copy Link</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </Popover>
                    </View>

                    <Text style={[commonStyles.headerText5G, {
                      lineHeight: 22, marginRight: 50,
                    }]} numberOfLines={1}>{item.description}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../assets/img/Location.png')} style={{ width: 10, height: 12 }} />
                        <Text style={[commonStyles.headerText5BL, {
                          marginLeft: 4, lineHeight: 22
                        }]} numberOfLines={1}>{item.location}</Text>
                      </View>
                    </View>

                    {/* Add more texts or components if needed */}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      case 3:
        return (
          <ScrollView nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: height * 0.5 }}
            showsVerticalScrollIndicator={false}>
            {/* List of items */}
            {filteredData.map((item) => (
              <TouchableOpacity
                key={item.id}
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
                onPress={() => navigation.navigate('ProfileScreen')}
              >
                {/* Left side image and text */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.img ? (
                    <Image source={{ uri: item.img }} style={styles.profileImage} />
                  ) : (
                    <Image source={renderDefaultImage(item.gender)} style={styles.profileImage} />
                  )}
                  <View style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                      <Text style={[commonStyles.headerText4BL, { lineHeight: 24, }]} numberOfLines={1}>{item.title}</Text>
                      <Popover
                        placement={PopoverPlacement.LEFT}
                        from={(
                          <TouchableOpacity
                          >
                            <Image
                              source={require('../../../assets/img/ViewM.png')}
                              style={{ width: 3, height: 13, marginRight: 5 }}
                            />
                          </TouchableOpacity>
                        )}>
                        <View style={commonStyles.popover}>
                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Bookmark.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Save PDF</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/SaveCon.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Save Contact</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Spam.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Report Spam</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View style={commonStyles.popoverItemContainer}>
                              <Image
                                source={require('../../../assets/img/Link.png')}
                                style={commonStyles.popoverItemIcon}
                              />
                              <Text style={commonStyles.popoverItemText}>Copy Link</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </Popover>
                    </View>

                    <Text style={[commonStyles.headerText5G, {
                      lineHeight: 22, marginRight: 50,
                    }]} numberOfLines={1}>{item.description}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../assets/img/Location.png')} style={{ width: 10, height: 12 }} />
                        <Text style={[commonStyles.headerText5BL, {
                          marginLeft: 4, lineHeight: 22
                        }]} numberOfLines={1}>{item.location}</Text>
                      </View>
                    </View>

                    {/* Add more texts or components if needed */}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      case 4:
        return (
          <ScrollView nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: height * 0.5 }}
            showsVerticalScrollIndicator={false}
          >
            {contacts.map(contact => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                {/* Your rendering logic for contacts */}
                <Text style={[commonStyles.headerText4BL, {}]}>{contact.displayName}</Text>

                <TouchableOpacity
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: width * 0.01,
                    borderRadius: 6,
                    borderColor: '#289EF5',
                    borderWidth: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: width * 0.2,
                  }}
                  onPress={() => {
                    const options = {
                      message: 'Check out this awesome app!',
                      url: 'https://play.google.com/store/apps/details?id=com.cheersbyunited',
                      title: 'Download the App',
                    };



                    Share.open(options)
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => {
                        err && console.log(err);
                      });
                  }}
                >
                  <Text style={{
                    fontSize: responsiveFontSize(14),
                    alignSelf: 'center',
                    color: '#289EF5',
                    paddingHorizontal: 5,
                    textAlign: 'center',
                    fontFamily: 'DMSans-Medium',
                    lineHeight: height * 0.028 //28
                  }}>Invite</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          // <ScrollView nestedScrollEnabled={true}
          //   contentContainerStyle={{ paddingBottom: height * 0.5 }}
          //   showsVerticalScrollIndicator={false}
          // >
          //   {contacts.map(contact => (
          //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
          //       {/* Your rendering logic for contacts */}
          //                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          //                          {/* Initial avatar */}
          //                         <View
          //                           style={{
          //                             width: 42,
          //                             height: 42,
          //                             borderRadius: 36,
          //                             backgroundColor: '#E8F8FF',
          //                             justifyContent: 'center',
          //                             alignItems: 'center',
          //                           }}
          //                         >
          //                           <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#979797' }}>
          //                             {contact.displayName.charAt(0).toUpperCase()}
          //                           </Text>
          //                         </View>

          //                         {/* Contact name */}
          //                         <Text style={[commonStyles.headerText4BL, { marginLeft: 10 }]}>
          //                           {contact.displayName}
          //                         </Text>
          //                       </View>

          //       <TouchableOpacity
          //         style={{
          //                               paddingVertical: 4,
          //                               borderRadius: 24,
          //                               borderColor: '#289EF5',
          //                               borderWidth: 1,
          //                               justifyContent: 'space-between',
          //                               alignItems: 'center',
          //                               width: width * 0.24,
          //         }}
          //         onPress={() => {
          //           const options = {
          //             message: 'Check out this awesome app!',
          //             url: 'https://play.google.com/store/apps/details?id=com.cheersbyunited',
          //             title: 'Download the App',
          //           };



          //           Share.open(options)
          //             .then((res) => {
          //               console.log(res);
          //             })
          //             .catch((err) => {
          //               err && console.log(err);
          //             });
          //         }}
          //       >
          //         <Text style={{
          //           fontSize: responsiveFontSize(14),
          //           alignSelf: 'center',
          //           color: '#289EF5',
          //           paddingHorizontal: 5,
          //           textAlign: 'center',
          //           fontFamily: 'DMSans-Medium',
          //           lineHeight: height * 0.028 //28
          //         }}>Invite</Text>
          //       </TouchableOpacity>
          //     </View>
          //   ))}
          // </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {isLoading ? (
        <Animation />
      ) : (
    <View>
        {/* Header */}
        <View>
          <View style={commonStyles.wrapT}>
            <TouchableOpacity style={commonStyles.backContainer}  activeOpacity={0.8}>
              {/* <Image
                                source={require('../../assets/img/Back.png')}
                                style={commonStyles.icon}
                            /> */}
            </TouchableOpacity>
            <Text style={commonStyles.backText}>Explore</Text>
            <TouchableOpacity style={commonStyles.backContainer1}  activeOpacity={0.8}>
              <Image
                source={require('../../../assets/img/Option.png')}
                style={commonStyles.icon}
              />
            </TouchableOpacity>
          </View>


          <View style={commonStyles.searchBarContainer}>
            <View style={commonStyles.leftContainer}>
              <View style={commonStyles.backContainerSearch}>
                <Image
                  source={require('../../../assets/img/Search.png')}
                  style={commonStyles.icon}
                />
              </View>
              <TextInput
                style={commonStyles.searchInput}
                placeholder="Search"
                placeholderTextColor='grey'
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            <View style={commonStyles.backContainerFilter}>
              <Image
                source={require('../../../assets/img/filter.png')}
                style={commonStyles.icon}
              />
            </View>

          </View>
        </View>

        {/* Tabs */}
        <ScrollView style={styles.tabContainer} horizontal showsHorizontalScrollIndicator={false}>
          {/* Tab buttons */}
          {[0, 1, 2, 3, 4].map((index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tabItem, selectedTab === index && styles.selectedTabItem]}
              //onPress={() => setSelectedTab(index)}
              onPress={() => handleTabChange(index)}
              activeOpacity={0.8}
            >
              {/* Tab icon */}
              {/* Your tab icon component here */}
              {/* Tab text */}
              <Text style={[styles.tabText, selectedTab === index && styles.selectedTabText]}>
                {index === 0 ? "Professionals" :
                  index === 1 ? "Clinics" :
                    index === 2 ? "Office" :
                      index === 3 ? "Others" :
                        "Contacts"}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Render selected tab content */}
        {renderTabContent()}
    </View>
      )}

    </SafeAreaView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: '#FEFCFC',
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  header: {
    // Header styles
    // Set the header as fixed or sticky if needed
  },
  selectedTabText: {
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 5,
    textAlign: 'center',
    fontSize: responsiveFontSize(15),
    fontFamily: 'DMSans-Medium',
    lineHeight: height * 0.028 //28
  },
  tabImage: {
    width: 17,
    height: 15,
    marginRight: 5
  },
  tabText: {
    fontSize: responsiveFontSize(15),
    alignSelf: 'center',
    color: '#289EF5',
    paddingHorizontal: 5,
    textAlign: 'center',
    fontFamily: 'DMSans-Medium',
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
    marginBottom: height * 0.03,
  },
  tabItem: {
    height: height * 0.04,
    flexDirection: 'row',
    backgroundColor: '#E8F8FF',
    opacity: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.005,
    marginRight: 12,  // Adjust this value
    paddingHorizontal: height * 0.01,
    marginBottom: height * 0.03,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  collapsedText: {
    // Collapsed text styles
    // Style for your text content
  },
  buttonM: {
    // Button styles
    // Style for your buttons
  },
  buttonTextM: {
    // Button text styles
    // Style for text inside buttons
  },
  profileImage:{
    height: 55,
    width: 55,
    borderRadius: 36,
    marginRight: 15
  },
};


export default Explore;