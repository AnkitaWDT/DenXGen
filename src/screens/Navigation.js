/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import OnBoardScreen from './OnBoarding/OnBoardingScreen';
import LoginScreen from './Login/LoginScreen';
import PersonalProfile from './PersonalProfile';
import OTPScreen from './Login/OTPScreen';
import Personalize from './Personalize';
import SelectCategory from './SelectCategory';
import ProfileCompletion1 from './ProfileCompletion/ProfileCompletion1';
import LocationScreen from './LocationScreen';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import HomePage from './HomeScreen/HomePage';
import MyProfile from './Profile/MyProfile';
import ProfileCompletion2 from './ProfileCompletion/ProfileCompletion2';
import ProfileCompletion3 from './ProfileCompletion/ProfileCompletion3';
import ProfileCompletion4 from './ProfileCompletion/ProfileCompletion4';
import ProfileCompletion5 from './ProfileCompletion/ProfileCompletion5';
import Connections from './Connection/Connections';
import ProfileCompletion6 from './ProfileCompletion/ProfileCompletion6';
import ProfileCompletion7 from './ProfileCompletion/ProfileCompletion7';
import ProfileCompletion8 from './ProfileCompletion/ProfileCompletion8';
import Notifications from './HomeScreen/Notifications';
import NDProfileCompletion1 from './NonDental/NDProfileCompletion1';
import NDProfileCompletion2 from './NonDental/NDProfileCompletion2';
import NDProfileCompletion3 from './NonDental/NDProfileCompletion3';
import NDProfileCompletion4 from './NonDental/NDProfileCompletion4';
import NDProfileCompletion5 from './NonDental/NDProfileCompletion5';
import NDProfileCompletion6 from './NonDental/NDProfileCompletion6';
import NDProfileCompletion7 from './NonDental/NDProfileCompletion7';
import NDProfileCompletion8 from './NonDental/NDProfileCompletion8';
import ClinicProfileCompletion1 from './ClinicProfile/ClinicProfileCompletion1';
import OfficeProfileCompletion1 from './OfficeProfile/OfficeProfileCompletion1';
import ClinicProfileCompletion2 from './ClinicProfile/ClinicProfileCompletion2';
import ClinicProfileCompletion3 from './ClinicProfile/ClinicProfileCompletion3';
import OfficeProfileCompletion3 from './OfficeProfile/OfficeProfileCompletion3';
import OfficeProfileCompletion2 from './OfficeProfile/OfficeProfileCompletion2';
import ClinicProfileCompletion4 from './ClinicProfile/ClinicProfileCompletion4';
import OfficeProfileCompletion4 from './OfficeProfile/OfficeProfileCompletion4';
import ClinicProfileCompletion5 from './ClinicProfile/ClinicProfileCompletion5';
import OfficeProfileCompletion5 from './OfficeProfile/OfficeProfileCompletion5';
import ClinicProfileCompletion6 from './ClinicProfile/ClinicProfileCompletion6';
import OfficeProfileCompletion6 from './OfficeProfile/OfficeProfileCompletion6';
import ClinicProfileCompletion7 from './ClinicProfile/ClinicProfileCompletion7';
import OfficeProfileCompletion7 from './OfficeProfile/OfficeProfileCompletion7';
import ClinicProfileCompletion8 from './ClinicProfile/ClinicProfileCompletion8';
import OfficeProfileCompletion8 from './OfficeProfile/OfficeProfileCompletion8';
import MyConnections from './Connection/MyConnections';
import Explore from './Explore/Explore';
import SentReq from './Connection/SentReq';
import ReceivedReq from './Connection/ReceivedReq';
import BlockAcc from './Connection/BlockAcc';
import EditProfile from './Profile/EditProfile';
import ProfileScreen from './ProfileScreen';
import FiltersScreen from './HomeScreen/FiltersScreen';
import Settings from './Profile/Settings';
import QRScreen from './QRScreen';
import DropCards from './Connection/DropCards';
import SelectDentist from './SelectDentist';
import SelectCDentist from './SelectCDentist';
import SelectTeams from './SelectTeams';
import ClinicProfile from './Profile/ClinicProfile';
import WebViewScreen from '../components/WebViewScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OnBoardScreen"
                    component={OnBoardScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OTPScreen"
                    component={OTPScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Personalize"
                    component={Personalize}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectCategory"
                    component={SelectCategory}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileCompletion1"
                    component={ProfileCompletion1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NDProfileCompletion1"
                    component={NDProfileCompletion1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LocationScreen"
                    component={LocationScreen}
                    options={{ headerShown: false }}
                />
             
                <Stack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="HomePage"
                    component={HomePage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileCompletion2"
                    component={ProfileCompletion2}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileCompletion3"
                    component={ProfileCompletion3}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileCompletion4"
                    component={ProfileCompletion4}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileCompletion5"
                    component={ProfileCompletion5}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileCompletion6"
                    component={ProfileCompletion6}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileCompletion7"
                    component={ProfileCompletion7}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileCompletion8"
                    component={ProfileCompletion8}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NDProfileCompletion2"
                    component={NDProfileCompletion2}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NDProfileCompletion3"
                    component={NDProfileCompletion3}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NDProfileCompletion4"
                    component={NDProfileCompletion4}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NDProfileCompletion5"
                    component={NDProfileCompletion5}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NDProfileCompletion6"
                    component={NDProfileCompletion6}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NDProfileCompletion7"
                    component={NDProfileCompletion7}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NDProfileCompletion8"
                    component={NDProfileCompletion8}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Connections"
                    component={Connections}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="MyProfile"
                    component={MyProfile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ClinicProfileCompletion1"
                    component={ClinicProfileCompletion1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ClinicProfileCompletion2"
                    component={ClinicProfileCompletion2}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ClinicProfileCompletion3"
                    component={ClinicProfileCompletion3}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ClinicProfileCompletion4"
                    component={ClinicProfileCompletion4}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ClinicProfileCompletion5"
                    component={ClinicProfileCompletion5}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ClinicProfileCompletion6"
                    component={ClinicProfileCompletion6}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="ClinicProfileCompletion7"
                    component={ClinicProfileCompletion7}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ClinicProfileCompletion8"
                    component={ClinicProfileCompletion8}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OfficeProfileCompletion1"
                    component={OfficeProfileCompletion1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OfficeProfileCompletion2"
                    component={OfficeProfileCompletion2}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OfficeProfileCompletion3"
                    component={OfficeProfileCompletion3}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OfficeProfileCompletion4"
                    component={OfficeProfileCompletion4}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OfficeProfileCompletion5"
                    component={OfficeProfileCompletion5}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="OfficeProfileCompletion6"
                    component={OfficeProfileCompletion6}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OfficeProfileCompletion7"
                    component={OfficeProfileCompletion7}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OfficeProfileCompletion8"
                    component={OfficeProfileCompletion8}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Explore"
                    component={Explore}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyConnections"
                    component={MyConnections}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SentReq"
                    component={SentReq}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ReceivedReq"
                    component={ReceivedReq}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BlockAcc"
                    component={BlockAcc}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DropCards"
                    component={DropCards}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PersonalProfile"
                    component={PersonalProfile}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FiltersScreen"
                    component={FiltersScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="QRScreen"
                    component={QRScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectDentist"
                    component={SelectDentist}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectCDentist"
                    component={SelectCDentist}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectTeams"
                    component={SelectTeams}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ClinicProfile"
                    component={ClinicProfile}
                    options={{ headerShown: false }}
                /> 
                <Stack.Screen
                    name="WebViewScreen"
                    component={WebViewScreen}
                    options={{ headerShown: false }}
                /> 
                {/* <Stack.Screen
                    name="RegistrationInformation"
                    component={RegistrationInformation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="StudentScreen"
                    component={StudentScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PersonalDetails"
                    component={PersonalDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PractitionerScreen"
                    component={PractitionerScreen}
                    options={{ headerShown: false}}
                />

                <Stack.Screen
                    name="ParadentalScreen"
                    component={ParadentalScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileCompletion"
                    component={ProfileCompletion}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="ContactList"
                    component={ContactList}
                    options={{ headerShown: false }}
                />




                <Stack.Screen
                    name="MapScreen"
                    component={MapScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="ClinicAccount"
                    component={ClinicAccount}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PersonalProfile"
                    component={PersonalProfile}
                    options={{ headerShown: false }}
                />




                <Stack.Screen
                    name="Animation"
                    component={Animation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ManageAddress"
                    component={ManageAddress}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyConnections"
                    component={MyConnections}
                    options={{ headerShown: false }}
                />




*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
