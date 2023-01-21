import { useState } from "react";

// type imports
import { realmFunctionNames } from "../../../../../data/realm/functions";

// hook imports
import useCreateMarker from "../../../../../hooks/useCreateMarker";
import useMission from "../../../../../hooks/useMission";
import useRealm from "../../../../../hooks/useRealm";
import useMissionMap from "../../../../../hooks/useMissionMap";
import useNavigation from "../../../../../hooks/useNavigation";

import {
  CreateWorksiteArgs,
  constructionTypes,
  buildingUses,
  collapses,
  operatingLevels,
  voids,
  worksiteTriageLevels,
  innerHazards,
  
} from "../../../../../data/realm/schema/worksite";

import SingleDropdown from "../../../ui/SingleDropdown";

import { useTranslation } from 'react-i18next';

import styled from "styled-components";

const CreateWorksiteMarker = () => {
  const { realm } = useRealm();
  const { createMarkerLocation: location } = useCreateMarker();
  const { activeMission } = useMission();
  const { setIsDrawOpen } = useNavigation();
  const { reRenderBoolean, setReRenderBoolean } = useMissionMap();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {

      if (activeMission) {
        const args: CreateWorksiteArgs = {
          identifier: identifierValue,
          address: addressValue,
          boundaries: boundariesValue,
          constructionType: selectedConstructionType as constructionTypes,
          buildingUse: selectedBuildingUse as buildingUses,
          floorArea: floorAreaValue,
          floorNumber: floorNumberValue,
          basementNumber: basementNumberValue,
          collapse: selectedCollapse as collapses,
          damage: damageValue,
          voids: selectedVoid as voids,
          operatingTeams: operatingTeamsValue,
          operatingLevel: selectedOperatingLevel as operatingLevels,
          worksiteTriageLevel: selectedWorksiteTriageLevel as worksiteTriageLevels,
          missingPersons: missingPersonsValue,
          confirmedLive: confirmedLiveValue,
          confirmedVictims: confirmedVictimsValue,
          needsMedical: needsMedicalValue,
          needsFirefighting: needsFirefightingValue,
          needsDecon: needsDeconValue,
          needsPumping: needsPumpingValue,
          needsDogSearch: needsDogSearchValue,
          needsTechnicalSearch: needsTechnicalSearchValue,
          needsShoring: needsShoringValue,
          needsBreaking: needsBreakingValue,
          needsLifting: needsLiftingValue,
          needsRoping: needsRopingValue,
          liveVictimsExtricated: liveVictimsExtricatedValue,
          deadVictimsRecovered: deadVictimsRecoveredValue,
          otherOperationalActivities: otherOperationalActivitiesValue,
          logisticalNeeds: logisticalNeedsValue,
          nextActionPlan: nextActionPlanValue,
          worksiteRelevantContacts: worksiteRelevantContactsValue,
          hasHazmat: hasHazmatValue,
          innerHazards: selectedInnerHazards as innerHazards,
          unusualHazards: unusualHazardsValue,
          notice: noticeValue,
          mission: activeMission._id.toString(),
          geoJSON: { type: "Point", coordinates: location },
          status: "active",
        };

        setLoading(true);

        if (realm.currentUser) {
          // call the Realm function
          await realm.currentUser.callFunction(
            realmFunctionNames.createWorksite,
            args
          );
        }

        setLoading(false);
        setReRenderBoolean(!reRenderBoolean);
        setIsDrawOpen(false);
      }
    } catch (e) {
      console.log(
        "There has been an error while calling the Realm custom function called:",
        realmFunctionNames.createWorksite,
        "Error:",
        e
      );
    }
  };

  //identifier
  const [identifierValue, setIdentifierValue] = useState<string>("");

  const handleIdentifierChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIdentifierValue(event.currentTarget.value);
  };

  // address
  const [addressValue, setAddressValue] = useState<string>("");

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddressValue(event.currentTarget.value);
  };

  // boundaries
  const [boundariesValue, setBoundariesValue] = useState<string>("");

  const handleBoundariesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBoundariesValue(event.currentTarget.value);
  };

  // constructionType
  const [selectedConstructionType, setSelectedConstructionType] = useState<string>(
    constructionTypes.CONCRETECONSTRUCTION
  );

  const handleConstructionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedConstructionType(e.currentTarget.value);
  };

  // buildingUse
  const [selectedBuildingUse, setSelectedBuildingUse] = useState<string>(
    buildingUses.LIVING
  );

  const handleBuildingUseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBuildingUse(e.currentTarget.value);
  };

  // floorArea
  const [floorAreaValue, setFloorAreaValue] = useState<string>("");

  const handleFloorAreaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFloorAreaValue(event.currentTarget.value);
  };

  // floorNumber
  const [floorNumberValue, setFloorNumberValue] = useState<string>("");

  const handleFloorNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFloorNumberValue(event.currentTarget.value);
  };

  // basementNumber
  const [basementNumberValue, setBasementNumberValue] = useState<string>("");

  const handleBasementNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBasementNumberValue(event.currentTarget.value);
  };

  // collapse
  const [selectedCollapse, setSelectedCollapse] = useState<string>(
    collapses.OUTSPREAD
  );

  const handleCollapseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollapse(e.currentTarget.value);
  };

  // damage
  const [damageValue, setDamageValue] = useState<string>("");

  const handleDamageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDamageValue(event.currentTarget.value);
  };

  // voids
  const [selectedVoid, setSelectedVoid] = useState<string>(
    voids.SMALL
  );

  const handleVoidsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoid(e.currentTarget.value);
  };

  // worksiteTriageLevel
  const [selectedWorksiteTriageLevel, setSelectedWorksiteTriageLevel] = useState<string>(
    worksiteTriageLevels.B
  );

  const handleWorksiteTriageLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorksiteTriageLevel(e.currentTarget.value);
  };

  // PLANNING

  //missingPersons
  const [missingPersonsValue, setMissingPersonsValue] = useState<string>("");

  const handleMissingPersonsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMissingPersonsValue(event.currentTarget.value);
  };

  // confirmedLive
  const [confirmedLiveValue, setConfirmedLiveValue] = useState<string>("");

  const handleConfirmedLiveChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmedLiveValue(event.currentTarget.value);
  };

  // confirmedVictims
  const [confirmedVictimsValue, setConfirmedVictimsValue] = useState<string>("");

  const handleConfirmedVictimsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmedVictimsValue(event.currentTarget.value);
  };


  // needsMedical
  const [needsMedicalValue, setNeedsMedicalValue] = useState(false);

  const handleNeedsMedicalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsMedicalValue(e.target.checked);
  };

  // needsFirefighting
  const [needsFirefightingValue, setNeedsFirefightingValue] = useState(false);

  const handleNeedsFirefightingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsFirefightingValue(e.target.checked);
  };

  // needsDecon
  const [needsDeconValue, setNeedsDeconValue] = useState(false);

  const handleNeedsDeconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsDeconValue(e.target.checked);
  };

  // needsPumping
  const [needsPumpingValue, setNeedsPumpingValue] = useState(false);

  const handleNeedsPumpingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsPumpingValue(e.target.checked);
  };

  // needsDogSearch
  const [needsDogSearchValue, setNeedsDogSearchValue] = useState(false);

  const handleNeedsDogSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsDogSearchValue(e.target.checked);
  };

  // needsTechnicalSearch
  const [needsTechnicalSearchValue, setNeedsTechnicalSearchValue] = useState(false);

  const handleNeedsTechnicalSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsTechnicalSearchValue(e.target.checked);
  };

  // needsShoring
  const [needsShoringValue, setNeedsShoringValue] = useState(false);

  const handleNeedsShoringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsShoringValue(e.target.checked);
  };

  // needsBreaking
  const [needsBreakingValue, setNeedsBreakingValue] = useState(false);

  const handleNeedsBreakingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsBreakingValue(e.target.checked);
  };

  // needsLifting
  const [needsLiftingValue, setNeedsLiftingValue] = useState(false);

  const handleNeedsLiftingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsLiftingValue(e.target.checked);
  };

  // needsRoping
  const [needsRopingValue, setNeedsRopingValue] = useState(false);

  const handleNeedsRopingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsRopingValue(e.target.checked);
  };

  // logisticalNeeds
  const [logisticalNeedValue, setLogisticalNeedValue] = useState<string>("");
  const [logisticalNeedsValue, setLogisticalNeedsValue] = useState<string[]>([]);

  const handlelogisticalNeedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLogisticalNeedValue(event.currentTarget.value);
  };

  const handleLogisticalNeedsChange = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (logisticalNeedValue) {
      const logisticalNeeds: string[] = logisticalNeedsValue;
      logisticalNeeds.push(logisticalNeedValue);

      setLogisticalNeedsValue(logisticalNeeds);
      setLogisticalNeedValue("");
    }
  };

  const handleRemoveNeeds = (logisticalNeedToBeRemoved: string) => {
    const logisticalNeeds: string[] = logisticalNeedsValue;

    const reducedLogisticalNeeds = logisticalNeeds.filter(
      (logisticalNeed: string) => logisticalNeed !== logisticalNeedToBeRemoved
    );

    setLogisticalNeedsValue(reducedLogisticalNeeds);
  };

  // nextActionPlan
  const [nextActionPlanoValue, setNextActionPlanoValue] = useState<string>("");
  const [nextActionPlanValue, setNextActionPlanValue] = useState<string[]>([]);

  const handleNextActionPlanoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNextActionPlanoValue(event.currentTarget.value);
  };

  const handleNextActionPlanChange = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (nextActionPlanoValue) {
      const nextActionPlan: string[] = nextActionPlanValue;
      nextActionPlan.push(nextActionPlanoValue);

      setNextActionPlanValue(nextActionPlan);
      setNextActionPlanoValue("");
    }
  };

  const handleRemovePlans = (nextActionPlanoToBeRemoved: string) => {
    const nextActionPlan: string[] = nextActionPlanValue;

    const reducedNextActionPlan = nextActionPlan.filter(
      (nextActionPlano: string) => nextActionPlano !== nextActionPlanoToBeRemoved
    );

    setNextActionPlanValue(reducedNextActionPlan);
  };

  // SITUATION

  // operatingTeams
  const [operatingTeamValue, setOperatingTeamValue] = useState<string>("");
  const [operatingTeamsValue, setOperatingTeamsValue] = useState<string[]>([]);

  const handleOperatingTeamChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOperatingTeamValue(event.currentTarget.value);
  };

  const handleOperatingTeamsChange = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (operatingTeamValue) {
      const operatingTeams: string[] = operatingTeamsValue;
      operatingTeams.push(operatingTeamValue);

      setOperatingTeamsValue(operatingTeams);
      setOperatingTeamValue("");
    }
  };

  const handleRemoveObject = (operatingTeamToBeRemoved: string) => {
    const operatingTeams: string[] = operatingTeamsValue;

    const reducedOperatingTeams = operatingTeams.filter(
      (operatingTeam: string) => operatingTeam !== operatingTeamToBeRemoved
    );

    setOperatingTeamsValue(reducedOperatingTeams);
  };

  // operatingLevel
  const [selectedOperatingLevel, setSelectedOperatingLevel] = useState<string>(
    operatingLevels.ASR3
  );

  const handleOperatingLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOperatingLevel(e.currentTarget.value);
  };

  // liveVictimsExtricated
  const [liveVictimsExtricatedValue, setLiveVictimsExtricatedValue] = useState<string>("");

  const handleLiveVictimsExtricatedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLiveVictimsExtricatedValue(event.currentTarget.value);
  };

  // deadVictimsRecovered
  const [deadVictimsRecoveredValue, setDeadVictimsRecoveredValue] = useState<string>("");

  const handleDeadVictimsRecoveredChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeadVictimsRecoveredValue(event.currentTarget.value);
  };

  // otherOperationalActivities
  const [otherOperationalActivitiValue, setOtherOperationalActivitiValue] = useState<string>("");
  const [otherOperationalActivitiesValue, setOtherOperationalActivitiesValue] = useState<string[]>([]);

  const handleOtherOperationalActivitiChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherOperationalActivitiValue(event.currentTarget.value);
  };

  const handleOtherOperationalActivitiesChange = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (otherOperationalActivitiValue) {
      const otherOperationalActivities: string[] = otherOperationalActivitiesValue;
      otherOperationalActivities.push(otherOperationalActivitiValue);

      setOtherOperationalActivitiesValue(otherOperationalActivities);
      setOtherOperationalActivitiValue("");
    }
  };

  const handleRemoveActiviti = (otherOperationalActivitiToBeRemoved: string) => {
    const otherOperationalActivities: string[] = otherOperationalActivitiesValue;

    const reducedOtherOperationalActivities = otherOperationalActivities.filter(
      (otherOperationalActiviti: string) => otherOperationalActiviti !== otherOperationalActivitiToBeRemoved
    );

    setOtherOperationalActivitiesValue(reducedOtherOperationalActivities);
  };

  // worksiteRelevantContacts
  const [worksiteRelevantContactValue, setWorksiteRelevantContactValue] = useState<string>("");
  const [worksiteRelevantContactsValue, setWorksiteRelevantContactsValue] = useState<string[]>([]);

  const handleWorksiteRelevantContactChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWorksiteRelevantContactValue(event.currentTarget.value);
  };

  const handleWorksiteRelevantContactsChange = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (worksiteRelevantContactValue) {
      const worksiteRelevantContacts: string[] = worksiteRelevantContactsValue;
      worksiteRelevantContacts.push(worksiteRelevantContactValue);

      setWorksiteRelevantContactsValue(worksiteRelevantContacts);
      setWorksiteRelevantContactValue("");
    }
  };

  const handleRemoveContacts = (worksiteRelevantContactToBeRemoved: string) => {
    const worksiteRelevantContacts: string[] = worksiteRelevantContactsValue;

    const reducedWorksiteRelevantContacts = worksiteRelevantContacts.filter(
      (worksiteRelevantContact: string) => worksiteRelevantContact !== worksiteRelevantContactToBeRemoved
    );

    setWorksiteRelevantContactsValue(reducedWorksiteRelevantContacts);
  };

  // hasHazmat
  const [hasHazmatValue, setHasHazmatValue] = useState(false);

  const handleHasHazmatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasHazmatValue(e.target.checked);
  };

  // innerHazards
  const [selectedInnerHazards, setSelectedInnerHazards] = useState<string>(
    innerHazards.ASBESTOS
  );

  const handleInnerHazardsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInnerHazards(e.currentTarget.value);
  };

  // unusualHazards
  const [unusualHazardsValue, setUnusualHazardsValue] = useState<string>("");

  const handleUnusualHazardsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUnusualHazardsValue(event.currentTarget.value);
  };

  // notice
  const [noticeValue, setNoticeValue] = useState<string>("");

  const handleNoticeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoticeValue(event.currentTarget.value);
  };

  // toggle areas

  const [toggleStructure, setToggleStructure] = useState(false)
  const [togglePlanning, setTogglePlanning] = useState(false)
  const [toggleSituation, setToggleSituation] = useState(false)
  const [toggleRisk, setToggleRisk] = useState(false)

  const { t } = useTranslation();

  return (
    <StyledDrawWrapper>
      <StyledDrawHeader>
        <StyledHeading>{ t("Worksite.headline")}</StyledHeading>
      </StyledDrawHeader>

      <StyledContentWrapper>

        {/* IDENTIFIER */}
        <StyledSectionWrapper>
          <StyledSecondaryHeading>{t("Worksite.identifier")}</StyledSecondaryHeading>
          <StyledHint>{t("Worksite.identifierhint")}</StyledHint>
          <StyledInput
            type="text"
            value={identifierValue}
            onChange={handleIdentifierChange}
          />
        </StyledSectionWrapper>

        {/* ADDRESS */}
        <StyledSectionWrapper>
          <StyledSecondaryHeading>{t("Worksite.address")}</StyledSecondaryHeading>
          <StyledHint>{t("Worksite.addresshint")}</StyledHint>
          <StyledInput
            type="text"
            value={addressValue}
            onChange={handleAddressChange}
          />
        </StyledSectionWrapper>

        {/* BOUNDARIES */}
        <StyledSectionWrapper>
          <StyledSecondaryHeading>{t("Worksite.boundaries")}</StyledSecondaryHeading>
          <StyledHint>{t("Worksite.boundarieshint")}</StyledHint>
          <StyledInput
            type="text"
            value={boundariesValue}
            onChange={handleBoundariesChange}
          />
        </StyledSectionWrapper>

        {/* TOGGLE STRUCTURE */}
        <br />
        <button
          onClick={() => setToggleStructure(!toggleStructure)}
          className="toggleButton"
        >
          {t("Worksite.structure")}
        </button>
        {toggleStructure && (
          <>
            {/* CONSTRUCTION TYPE */}
            <StyledSectionWrapper>
              <StyledSecondaryHeading>{t("Worksite.constructiontype")}</StyledSecondaryHeading>
              <StyledHint>{t("Worksite.constructiontypehint")}</StyledHint>
              <SingleDropdown
                options={constructionTypeDropwdownOptions}
                value={selectedConstructionType}
                label={""}
                onChange={handleConstructionTypeChange}
              />
            </StyledSectionWrapper>

            {/* BUILDING USE */}
            <StyledSectionWrapper>
              <StyledSecondaryHeading>{t("Worksite.buildinguse")}</StyledSecondaryHeading>
              <StyledHint>{t("Worksite.buildingusehint")}</StyledHint>
              <SingleDropdown
                options={buildingUseDropwdownOptions}
                value={selectedBuildingUse}
                label={""}
                onChange={handleBuildingUseChange}
              />
            </StyledSectionWrapper>

            {/* FLOOR AREA */}
            <StyledSectionWrapper>
              <StyledSecondaryHeading>{t("Worksite.floorarea")}</StyledSecondaryHeading>
              <StyledHint>{t("Worksite.floorareahint")}</StyledHint>
              <StyledInput
                type="text"
              value={floorAreaValue}
              onChange={handleFloorAreaChange}
              />
            </StyledSectionWrapper>

            {/* FLOOR NUMBER */}
            <StyledSectionWrapper>
              <StyledSecondaryHeading>{t("Worksite.floornumber")}</StyledSecondaryHeading>
              <StyledHint>{t("Worksite.floornumberhint")}</StyledHint>
              <StyledInput
                type="text"
                value={floorNumberValue}
                onChange={handleFloorNumberChange}
              />
            </StyledSectionWrapper>

            {/* BASEMENT NUMBER */}
            <StyledSectionWrapper>
              <StyledSecondaryHeading>{t("Worksite.basementnumber")}</StyledSecondaryHeading>
              <StyledHint>{t("Worksite.basementnumberhint")}</StyledHint>
              <StyledInput
                type="text"
                value={basementNumberValue}
                onChange={handleBasementNumberChange}
              />
            </StyledSectionWrapper>

            {/* COLLAPSE */}
            <StyledSectionWrapper>
              <StyledSecondaryHeading>{t("Worksite.collapse")}</StyledSecondaryHeading>
              <StyledHint>{t("Worksite.collapsehint")}</StyledHint>
              <SingleDropdown
                options={collapseDropwdownOptions}
                value={selectedCollapse}
                label={""}
                onChange={handleCollapseChange}
              />
            </StyledSectionWrapper>

            {/* DAMAGE % */}
            <StyledSectionWrapper>
              <StyledSecondaryHeading>{t("Worksite.damage")}</StyledSecondaryHeading>
              <StyledHint>{t("Worksite.damagehint")}</StyledHint>
              <StyledInput
                type="text"
                value={damageValue}
                onChange={handleDamageChange}
              />
            </StyledSectionWrapper>

            {/* VOIDS */}
            <StyledSectionWrapper>
              <StyledSecondaryHeading>{t("Worksite.voids")}</StyledSecondaryHeading>
              <StyledHint>{t("Worksite.voidshint")}</StyledHint>
              <SingleDropdown
                options={voidsDropwdownOptions}
                value={selectedVoid}
                label={""}
                onChange={handleVoidsChange}
              />
            </StyledSectionWrapper>

            {/* WORKSITE TRIAGE LEVEL */}
            <StyledSectionWrapper>
              <StyledSecondaryHeading>{t("Worksite.triagelevel")}</StyledSecondaryHeading>
              <StyledHint>{t("Worksite.triagelevelhint")}</StyledHint>
              <SingleDropdown
                options={worksiteTriageLevelDropwdownOptions}
                value={selectedWorksiteTriageLevel}
                label={""}
                onChange={handleWorksiteTriageLevelChange}
              />
            </StyledSectionWrapper>

          </>
        )}

        {/* PLANNING */}
        <br />
        <button
          onClick={() => setTogglePlanning(!togglePlanning)}
          className="toggleButton"
        >
          {t("Worksite.planning")}
        </button>
        {togglePlanning && (
          <>
            {/* <StyledCheckbox type="checkbox" checked={isChecked} onChange={handleChange} /> */}
            
          </>
        )}

        {/* SITUATION */}
        <br />
        <button
          onClick={() => setToggleSituation(!toggleSituation)}
          className="toggleButton"
        >
          {t("Worksite.situation")}
        </button>
        {toggleSituation && (
          <>

          </>
        )}

        {/* RISK */}
        <br />
        <button
          onClick={() => setToggleRisk(!toggleRisk)}
          className="toggleButton"
        >
          {t("Worksite.risk")}
        </button>
        {toggleRisk && (
          <>

          </>
        )}

        (/* outside toggle */)
        <br />
        <StyledSectionWrapper>
          <StyledSecondaryHeading>{t("Worksite.notes")}</StyledSecondaryHeading>
          <StyledHint>{t("Worksite.noteshint")}</StyledHint>
          <StyledInput
            value={noticeValue}
            onChange={handleNoticeChange}
          />
        </StyledSectionWrapper>
        
        {/* SUBMIT */}
        <br />
        <StyledButton onClick={handleSubmit}>
          {t(loading ? "loading..." : "Submit Worksite")}
        </StyledButton>

      </StyledContentWrapper>
    </StyledDrawWrapper>
  );
};

const StyledDrawWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: ${(props) => props.theme.primaryBackgroundColor};
`;

const StyledDrawHeader = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 0.8rem;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeading = styled.p`
  font-weight: 500;
  font-size: 1.5rem;
  color: ${(props) => props.theme.primaryFontColor};
`;

const StyledContentWrapper = styled.div`
  /* padding-top: 8rem; */
  width: 100%;
  background: ${(props) => props.theme.primaryBackgroundColor};

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  overflow-y: scroll;
`;

const StyledSectionWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const StyledSecondaryHeading = styled.p`
  font-weight: 500;
  font-size: 1.4rem;
  color: ${(props) => props.theme.primaryFontColor};
`;

// styled components for this component only
const StyledButton = styled.button`
  width: 60%;
  height: 3rem;

  margin-top: 0.5rem;
  margin-bottom: 4rem;

  font-weight: 700;
  text-align: center;

  align-self: center;

  color: ${(props) => props.theme.buttonFontColor};
  background-color: ${(props) => props.theme.buttonColor};

  border: 1px solid ${(props) => props.theme.formSubmitBorderColor};
  border-radius: ${(props) => props.theme.inputBorderRadius};
`;

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.primaryBackgroundColor};
  color: ${(props) => props.theme.formFieldColor};

  border: 1px solid ${(props) => props.theme.formFieldColor};
  border-radius: ${(props) => props.theme.inputBorderRadius};

  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 500;

  width: 100%;
  /* margin-top: 0.6rem; */
  padding: 0.75rem;
`;

const StyledHint = styled.div`
margin-top: -0.4rem;
font-size: 0.8rem;
font-weight: 300;
`;

const StyledCheckbox = styled.input`
  /* Add your desired styles here */
  appearance: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  background-color: #fff;

  &:checked {
    /* Add styles for the checked state */
    background-color: #333;
    border-color: #333;
  }
`;

// dropdown options
const constructionTypeDropwdownOptions = [
  { label: constructionTypes.BRICKCONCRETE, value: constructionTypes.BRICKCONCRETE },
  { label: constructionTypes.BRICKWOOD, value: constructionTypes.BRICKWOOD },
  { label: constructionTypes.CONCRETECONSTRUCTION, value: constructionTypes.CONCRETECONSTRUCTION },
  { label: constructionTypes.CONCRETEWALLS, value: constructionTypes.CONCRETEWALLS },
  { label: constructionTypes.STEELFRAME, value: constructionTypes.STEELFRAME },
  { label: constructionTypes.STONE, value: constructionTypes.STONE},
  { label: constructionTypes.OTHER, value: constructionTypes.OTHER},
];

const buildingUseDropwdownOptions = [
  { label: buildingUses.LIVING, value: buildingUses.LIVING },
  { label: buildingUses.SHOPPING, value: buildingUses.SHOPPING },
  { label: buildingUses.HOSPITAL, value: buildingUses.HOSPITAL },
  { label: buildingUses.CARE, value: buildingUses.CARE },
  { label: buildingUses.OFFICE, value: buildingUses.OFFICE },
  { label: buildingUses.RELIGIOUS, value: buildingUses.RELIGIOUS },
  { label: buildingUses.SCHOOL, value: buildingUses.SCHOOL},
  { label: buildingUses.INDUSTRIAL, value: buildingUses.INDUSTRIAL},
  { label: buildingUses.HOTEL, value: buildingUses.HOTEL},
  { label: buildingUses.RESTAURANT, value: buildingUses.RESTAURANT },
  { label: buildingUses.MIXED, value: buildingUses.MIXED },
  { label: buildingUses.OTHER, value: buildingUses.OTHER },
];

const collapseDropwdownOptions = [
  { label: collapses.PLANE, value: collapses.PLANE },
  { label: collapses.MULTILAYER, value: collapses.MULTILAYER },
  { label: collapses.OUTSPREAD, value: collapses.OUTSPREAD },
  { label: collapses.PANCAKESEVERAL, value: collapses.PANCAKESEVERAL },
  { label: collapses.PANCAKEONE, value: collapses.PANCAKEONE },
  { label: collapses.HEAPVERTICAL, value: collapses.HEAPVERTICAL },
  { label: collapses.HEAPUNCOLLAPSED, value: collapses.HEAPUNCOLLAPSED },
  { label: collapses.HEAPDEBRIS, value: collapses.HEAPDEBRIS },
  { label: collapses.HEAPPLATES, value: collapses.HEAPPLATES },
  { label: collapses.OVERHANG, value: collapses.OVERHANG },
  { label: collapses.OVERTURN, value: collapses.OVERTURN },
  { label: collapses.OTHER, value: collapses.OTHER },
];

const voidsDropwdownOptions = [
  { label: voids.BIG, value: voids.BIG },
  { label: voids.SMALL, value: voids.SMALL },
];

const worksiteTriageLevelDropwdownOptions = [
  { label: worksiteTriageLevels.A, value: worksiteTriageLevels.A },
  { label: worksiteTriageLevels.B, value: worksiteTriageLevels.B },
  { label: worksiteTriageLevels.C, value: worksiteTriageLevels.C },
  { label: worksiteTriageLevels.D, value: worksiteTriageLevels.D },
  { label: worksiteTriageLevels.E, value: worksiteTriageLevels.E },
  { label: worksiteTriageLevels.F, value: worksiteTriageLevels.F },
];



export default CreateWorksiteMarker;
