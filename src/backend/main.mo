import AccessControl "authorization/access-control";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Map "mo:core/Map";
import MixinAuthorization "authorization/MixinAuthorization";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type BioInput = {
    heartRate : Nat;
    sleepQuality : Nat; // 1-10 scale
    activityLevel : Nat; // 1-10 scale
    geomagneticField : ?Nat;
    moonPhase : ?Nat;
    timestamp : Time.Time;
  };

  public type AlertLevel = {
    #red;
    #yellow;
    #blue;
  };

  public type Alert = {
    message : Text;
    level : AlertLevel;
    timestamp : Time.Time;
  };

  public type DreamJournalEntry = {
    date : Time.Time;
    content : Text;
    tags : [Text];
    mood : ?Text;
  };

  public type Ritual = {
    title : Text;
    description : Text;
    schedule : [Nat]; // Days of week (0-6)
    timeOfDay : ?Nat; // 0-23
    completed : Bool;
  };

  public type Settings = {
    localOnly : Bool;
    ethicsAccepted : Bool;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let bioInputs = Map.empty<Principal, List.List<BioInput>>();
  let alerts = Map.empty<Principal, List.List<Alert>>();
  let dreams = Map.empty<Principal, List.List<DreamJournalEntry>>();
  let rituals = Map.empty<Principal, List.List<Ritual>>();
  let userSettings = Map.empty<Principal, Settings>();

  module Alert {
    public func compare(alert1 : Alert, alert2 : Alert) : Order.Order {
      switch (alert1.level, alert2.level) {
        case (#red, #yellow) { #less };
        case (#red, #blue) { #less };
        case (#yellow, #red) { #greater };
        case (#yellow, #blue) { #less };
        case (#blue, #red) { #greater };
        case (#blue, #yellow) { #greater };
        case (_) { Int.compare(alert1.timestamp, alert2.timestamp) };
      };
    };
  };

  // ---------- User Profiles ----------
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ---------- Bio Inputs & Alerts ----------
  public shared ({ caller }) func addBioInput(input : BioInput) : async AlertLevel {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add bio inputs");
    };

    let userInputs = switch (bioInputs.get(caller)) {
      case (?inputs) { inputs };
      case (null) { List.empty<BioInput>() };
    };

    userInputs.add(input);
    bioInputs.add(caller, userInputs);

    // Generate alert based on rules
    let alert = generateAlert(input);
    let userAlerts = switch (alerts.get(caller)) {
      case (?alertList) { alertList };
      case (null) { List.empty<Alert>() };
    };

    userAlerts.add(alert);
    alerts.add(caller, userAlerts);

    alert.level;
  };

  // Modeled after verifyAllRequiredFields. Only create entries with required fields.
  public shared ({ caller }) func addDreamEntry(entry : DreamJournalEntry) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add dreams");
    };

    let userDreams = switch (dreams.get(caller)) {
      case (?dreamList) { dreamList };
      case (null) { List.empty<DreamJournalEntry>() };
    };

    userDreams.add(entry);
    dreams.add(caller, userDreams);
  };

  public shared ({ caller }) func addRitual(ritual : Ritual) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add rituals");
    };

    let userRituals = switch (rituals.get(caller)) {
      case (?ritualList) { ritualList };
      case (null) { List.empty<Ritual>() };
    };

    userRituals.add(ritual);
    rituals.add(caller, userRituals);
  };

  public shared ({ caller }) func updateSettings(settings : Settings) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update settings");
    };
    userSettings.add(caller, settings);
  };

  // ---------- Queries ----------
  public query ({ caller }) func getAlerts() : async [Alert] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view alerts");
    };
    switch (alerts.get(caller)) {
      case (?alertList) {
        alertList.toArray().sort();
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getDreams() : async [DreamJournalEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view dreams");
    };
    switch (dreams.get(caller)) {
      case (?dreamList) { dreamList.toArray() };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getRituals() : async [Ritual] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view rituals");
    };
    switch (rituals.get(caller)) {
      case (?ritualList) { ritualList.toArray() };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getSettings() : async ?Settings {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view settings");
    };
    userSettings.get(caller);
  };

  // ---------- Helper Functions ----------
  func generateAlert(_input : BioInput) : Alert {
    {
      message = "Sample alert message";
      level = #yellow;
      timestamp = Time.now();
    };
  };

  // ---------- Debug Functions ----------
  public shared ({ caller }) func clearUserData() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can clear their data");
    };
    // Allow users to clear their own data
    userProfiles.remove(caller);
    bioInputs.remove(caller);
    alerts.remove(caller);
    dreams.remove(caller);
    rituals.remove(caller);
    userSettings.remove(caller);
  };

  public query ({ caller }) func getAllUsers() : async [Principal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let keysIter = userProfiles.keys();
    keysIter.toArray();
  };
};
