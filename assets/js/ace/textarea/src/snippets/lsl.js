__ace_shadowed__.define('ace/snippets/lsl', ['require', 'exports', 'module' ], function(require, exports, module) ***REMOVED***


exports.snippetText = "snippet @\n\
	@$***REMOVED***1:label***REMOVED***;\n\
snippet CAMERA_ACTIVE\n\
	CAMERA_ACTIVE, $***REMOVED***1:integer isActive***REMOVED***, $0\n\
snippet CAMERA_BEHINDNESS_ANGLE\n\
	CAMERA_BEHINDNESS_ANGLE, $***REMOVED***1:float degrees***REMOVED***, $0\n\
snippet CAMERA_BEHINDNESS_LAG\n\
	CAMERA_BEHINDNESS_LAG, $***REMOVED***1:float seconds***REMOVED***, $0\n\
snippet CAMERA_DISTANCE\n\
	CAMERA_DISTANCE, $***REMOVED***1:float meters***REMOVED***, $0\n\
snippet CAMERA_FOCUS\n\
	CAMERA_FOCUS, $***REMOVED***1:vector position***REMOVED***, $0\n\
snippet CAMERA_FOCUS_LAG\n\
	CAMERA_FOCUS_LAG, $***REMOVED***1:float seconds***REMOVED***, $0\n\
snippet CAMERA_FOCUS_LOCKED\n\
	CAMERA_FOCUS_LOCKED, $***REMOVED***1:integer isLocked***REMOVED***, $0\n\
snippet CAMERA_FOCUS_OFFSET\n\
	CAMERA_FOCUS_OFFSET, $***REMOVED***1:vector meters***REMOVED***, $0\n\
snippet CAMERA_FOCUS_THRESHOLD\n\
	CAMERA_FOCUS_THRESHOLD, $***REMOVED***1:float meters***REMOVED***, $0\n\
snippet CAMERA_PITCH\n\
	CAMERA_PITCH, $***REMOVED***1:float degrees***REMOVED***, $0\n\
snippet CAMERA_POSITION\n\
	CAMERA_POSITION, $***REMOVED***1:vector position***REMOVED***, $0\n\
snippet CAMERA_POSITION_LAG\n\
	CAMERA_POSITION_LAG, $***REMOVED***1:float seconds***REMOVED***, $0\n\
snippet CAMERA_POSITION_LOCKED\n\
	CAMERA_POSITION_LOCKED, $***REMOVED***1:integer isLocked***REMOVED***, $0\n\
snippet CAMERA_POSITION_THRESHOLD\n\
	CAMERA_POSITION_THRESHOLD, $***REMOVED***1:float meters***REMOVED***, $0\n\
snippet CHARACTER_AVOIDANCE_MODE\n\
	CHARACTER_AVOIDANCE_MODE, $***REMOVED***1:integer flags***REMOVED***, $0\n\
snippet CHARACTER_DESIRED_SPEED\n\
	CHARACTER_DESIRED_SPEED, $***REMOVED***1:float speed***REMOVED***, $0\n\
snippet CHARACTER_DESIRED_TURN_SPEED\n\
	CHARACTER_DESIRED_TURN_SPEED, $***REMOVED***1:float speed***REMOVED***, $0\n\
snippet CHARACTER_LENGTH\n\
	CHARACTER_LENGTH, $***REMOVED***1:float length***REMOVED***, $0\n\
snippet CHARACTER_MAX_TURN_RADIUS\n\
	CHARACTER_MAX_TURN_RADIUS, $***REMOVED***1:float radius***REMOVED***, $0\n\
snippet CHARACTER_ORIENTATION\n\
	CHARACTER_ORIENTATION, $***REMOVED***1:integer orientation***REMOVED***, $0\n\
snippet CHARACTER_RADIUS\n\
	CHARACTER_RADIUS, $***REMOVED***1:float radius***REMOVED***, $0\n\
snippet CHARACTER_STAY_WITHIN_PARCEL\n\
	CHARACTER_STAY_WITHIN_PARCEL, $***REMOVED***1:boolean stay***REMOVED***, $0\n\
snippet CHARACTER_TYPE\n\
	CHARACTER_TYPE, $***REMOVED***1:integer type***REMOVED***, $0\n\
snippet HTTP_BODY_MAXLENGTH\n\
	HTTP_BODY_MAXLENGTH, $***REMOVED***1:integer length***REMOVED***, $0\n\
snippet HTTP_CUSTOM_HEADER\n\
	HTTP_CUSTOM_HEADER, $***REMOVED***1:string name***REMOVED***, $***REMOVED***2:string value***REMOVED***, $0\n\
snippet HTTP_METHOD\n\
	HTTP_METHOD, $***REMOVED***1:string method***REMOVED***, $0\n\
snippet HTTP_MIMETYPE\n\
	HTTP_MIMETYPE, $***REMOVED***1:string mimeType***REMOVED***, $0\n\
snippet HTTP_PRAGMA_NO_CACHE\n\
	HTTP_PRAGMA_NO_CACHE, $***REMOVED***1:integer send_header***REMOVED***, $0\n\
snippet HTTP_VERBOSE_THROTTLE\n\
	HTTP_VERBOSE_THROTTLE, $***REMOVED***1:integer noisy***REMOVED***, $0\n\
snippet HTTP_VERIFY_CERT\n\
	HTTP_VERIFY_CERT, $***REMOVED***1:integer verify***REMOVED***, $0\n\
snippet RC_DATA_FLAGS\n\
	RC_DATA_FLAGS, $***REMOVED***1:integer flags***REMOVED***, $0\n\
snippet RC_DETECT_PHANTOM\n\
	RC_DETECT_PHANTOM, $***REMOVED***1:integer dectedPhantom***REMOVED***, $0\n\
snippet RC_MAX_HITS\n\
	RC_MAX_HITS, $***REMOVED***1:integer maxHits***REMOVED***, $0\n\
snippet RC_REJECT_TYPES\n\
	RC_REJECT_TYPES, $***REMOVED***1:integer filterMask***REMOVED***, $0\n\
snippet at_rot_target\n\
	at_rot_target($***REMOVED***1:integer handle***REMOVED***, $***REMOVED***2:rotation targetrot***REMOVED***, $***REMOVED***3:rotation ourrot***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet at_target\n\
	at_target($***REMOVED***1:integer tnum***REMOVED***, $***REMOVED***2:vector targetpos***REMOVED***, $***REMOVED***3:vector ourpos***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet attach\n\
	attach($***REMOVED***1:key id***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet changed\n\
	changed($***REMOVED***1:integer change***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet collision\n\
	collision($***REMOVED***1:integer index***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet collision_end\n\
	collision_end($***REMOVED***1:integer index***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet collision_start\n\
	collision_start($***REMOVED***1:integer index***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet control\n\
	control($***REMOVED***1:key id***REMOVED***, $***REMOVED***2:integer level***REMOVED***, $***REMOVED***3:integer edge***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet dataserver\n\
	dataserver($***REMOVED***1:key query_id***REMOVED***, $***REMOVED***2:string data***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet do\n\
	do\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
	while ($***REMOVED***1:condition***REMOVED***);\n\
snippet else\n\
	else\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet email\n\
	email($***REMOVED***1:string time***REMOVED***, $***REMOVED***2:string address***REMOVED***, $***REMOVED***3:string subject***REMOVED***, $***REMOVED***4:string message***REMOVED***, $***REMOVED***5:integer num_left***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet for\n\
	for ($***REMOVED***1:start***REMOVED***; $***REMOVED***3:condition***REMOVED***; $***REMOVED***3:step***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet http_request\n\
	http_request($***REMOVED***1:key request_id***REMOVED***, $***REMOVED***2:string method***REMOVED***, $***REMOVED***3:string body***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet http_response\n\
	http_response($***REMOVED***1:key request_id***REMOVED***, $***REMOVED***2:integer status***REMOVED***, $***REMOVED***3:list metadata***REMOVED***, $***REMOVED***4:string body***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet if\n\
	if ($***REMOVED***1:condition***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet jump\n\
	jump $***REMOVED***1:label***REMOVED***;\n\
snippet land_collision\n\
	land_collision($***REMOVED***1:vector pos***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet land_collision_end\n\
	land_collision_end($***REMOVED***1:vector pos***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet land_collision_start\n\
	land_collision_start($***REMOVED***1:vector pos***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet link_message\n\
	link_message($***REMOVED***1:integer sender_num***REMOVED***, $***REMOVED***2:integer num***REMOVED***, $***REMOVED***3:string str***REMOVED***, $***REMOVED***4:key id***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet listen\n\
	listen($***REMOVED***1:integer channel***REMOVED***, $***REMOVED***2:string name***REMOVED***, $***REMOVED***3:key id***REMOVED***, $***REMOVED***4:string message***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet llAbs\n\
	llAbs($***REMOVED***1:integer val***REMOVED***)\n\
snippet llAcos\n\
	llAcos($***REMOVED***1:float val***REMOVED***)\n\
snippet llAddToLandBanList\n\
	llAddToLandBanList($***REMOVED***1:key agent***REMOVED***, $***REMOVED***2:float hours***REMOVED***);\n\
snippet llAddToLandPassList\n\
	llAddToLandPassList($***REMOVED***1:key agent***REMOVED***, $***REMOVED***2:float hours***REMOVED***);\n\
snippet llAdjustSoundVolume\n\
	llAdjustSoundVolume($***REMOVED***1:float volume***REMOVED***);\n\
snippet llAllowInventoryDrop\n\
	llAllowInventoryDrop($***REMOVED***1:integer add***REMOVED***);\n\
snippet llAngleBetween\n\
	llAngleBetween($***REMOVED***1:rotation a***REMOVED***, $***REMOVED***2:rotation b***REMOVED***)\n\
snippet llApplyImpulse\n\
	llApplyImpulse($***REMOVED***1:vector force***REMOVED***, $***REMOVED***2:integer local***REMOVED***);\n\
snippet llApplyRotationalImpulse\n\
	llApplyRotationalImpulse($***REMOVED***1:vector force***REMOVED***, $***REMOVED***2:integer local***REMOVED***);\n\
snippet llAsin\n\
	llAsin($***REMOVED***1:float val***REMOVED***)\n\
snippet llAtan2\n\
	llAtan2($***REMOVED***1:float y***REMOVED***, $***REMOVED***2:float x***REMOVED***)\n\
snippet llAttachToAvatar\n\
	llAttachToAvatar($***REMOVED***1:integer attach_point***REMOVED***);\n\
snippet llAttachToAvatarTemp\n\
	llAttachToAvatarTemp($***REMOVED***1:integer attach_point***REMOVED***);\n\
snippet llAvatarOnLinkSitTarget\n\
	llAvatarOnLinkSitTarget($***REMOVED***1:integer link***REMOVED***)\n\
snippet llAvatarOnSitTarget\n\
	llAvatarOnSitTarget()\n\
snippet llAxes2Rot\n\
	llAxes2Rot($***REMOVED***1:vector fwd***REMOVED***, $***REMOVED***2:vector left***REMOVED***, $***REMOVED***3:vector up***REMOVED***)\n\
snippet llAxisAngle2Rot\n\
	llAxisAngle2Rot($***REMOVED***1:vector axis***REMOVED***, $***REMOVED***2:float angle***REMOVED***)\n\
snippet llBase64ToInteger\n\
	llBase64ToInteger($***REMOVED***1:string str***REMOVED***)\n\
snippet llBase64ToString\n\
	llBase64ToString($***REMOVED***1:string str***REMOVED***)\n\
snippet llBreakAllLinks\n\
	llBreakAllLinks();\n\
snippet llBreakLink\n\
	llBreakLink($***REMOVED***1:integer link***REMOVED***);\n\
snippet llCastRay\n\
	llCastRay($***REMOVED***1:vector start***REMOVED***, $***REMOVED***2:vector end***REMOVED***, $***REMOVED***3:list options***REMOVED***);\n\
snippet llCeil\n\
	llCeil($***REMOVED***1:float val***REMOVED***)\n\
snippet llClearCameraParams\n\
	llClearCameraParams();\n\
snippet llClearLinkMedia\n\
	llClearLinkMedia($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:integer face***REMOVED***);\n\
snippet llClearPrimMedia\n\
	llClearPrimMedia($***REMOVED***1:integer face***REMOVED***);\n\
snippet llCloseRemoteDataChannel\n\
	llCloseRemoteDataChannel($***REMOVED***1:key channel***REMOVED***);\n\
snippet llCollisionFilter\n\
	llCollisionFilter($***REMOVED***1:string name***REMOVED***, $***REMOVED***2:key id***REMOVED***, $***REMOVED***3:integer accept***REMOVED***);\n\
snippet llCollisionSound\n\
	llCollisionSound($***REMOVED***1:string impact_sound***REMOVED***, $***REMOVED***2:float impact_volume***REMOVED***);\n\
snippet llCos\n\
	llCos($***REMOVED***1:float theta***REMOVED***)\n\
snippet llCreateCharacter\n\
	llCreateCharacter($***REMOVED***1:list options***REMOVED***);\n\
snippet llCreateLink\n\
	llCreateLink($***REMOVED***1:key target***REMOVED***, $***REMOVED***2:integer parent***REMOVED***);\n\
snippet llCSV2List\n\
	llCSV2List($***REMOVED***1:string src***REMOVED***)\n\
snippet llDeleteCharacter\n\
	llDeleteCharacter();\n\
snippet llDeleteSubList\n\
	llDeleteSubList($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer start***REMOVED***, $***REMOVED***3:integer end***REMOVED***)\n\
snippet llDeleteSubString\n\
	llDeleteSubString($***REMOVED***1:string src***REMOVED***, $***REMOVED***2:integer start***REMOVED***, $***REMOVED***3:integer end***REMOVED***)\n\
snippet llDetachFromAvatar\n\
	llDetachFromAvatar();\n\
snippet llDetectedGrab\n\
	llDetectedGrab($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedGroup\n\
	llDetectedGroup($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedKey\n\
	llDetectedKey($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedLinkNumber\n\
	llDetectedLinkNumber($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedName\n\
	llDetectedName($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedOwner\n\
	llDetectedOwner($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedPos\n\
	llDetectedPosl($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedRot\n\
	llDetectedRot($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedTouchBinormal\n\
	llDetectedTouchBinormal($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedTouchFace\n\
	llDetectedTouchFace($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedTouchNormal\n\
	llDetectedTouchNormal($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedTouchPos\n\
	llDetectedTouchPos($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedTouchST\n\
	llDetectedTouchST($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedTouchUV\n\
	llDetectedTouchUV($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedType\n\
	llDetectedType($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDetectedVel\n\
	llDetectedVel($***REMOVED***1:integer number***REMOVED***)\n\
snippet llDialog\n\
	llDialog($***REMOVED***1:key agent***REMOVED***, $***REMOVED***2:string message***REMOVED***, $***REMOVED***3:list buttons***REMOVED***, $***REMOVED***4:integer channel***REMOVED***);\n\
snippet llDie\n\
	llDie();\n\
snippet llDumpList2String\n\
	llDumpList2String($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:string separator***REMOVED***)\n\
snippet llEdgeOfWorld\n\
	llEdgeOfWorld($***REMOVED***1:vector pos***REMOVED***, $***REMOVED***2:vector dir***REMOVED***)\n\
snippet llEjectFromLand\n\
	llEjectFromLand($***REMOVED***1:key agent***REMOVED***);\n\
snippet llEmail\n\
	llEmail($***REMOVED***1:string address***REMOVED***, $***REMOVED***2:string subject***REMOVED***, $***REMOVED***3:string message***REMOVED***);\n\
snippet llEscapeURL\n\
	llEscapeURL($***REMOVED***1:string url***REMOVED***)\n\
snippet llEuler2Rot\n\
	llEuler2Rot($***REMOVED***1:vector v***REMOVED***)\n\
snippet llExecCharacterCmd\n\
	llExecCharacterCmd($***REMOVED***1:integer command***REMOVED***, $***REMOVED***2:list options***REMOVED***);\n\
snippet llEvade\n\
	llEvade($***REMOVED***1:key target***REMOVED***, $***REMOVED***2:list options***REMOVED***);\n\
snippet llFabs\n\
	llFabs($***REMOVED***1:float val***REMOVED***)\n\
snippet llFleeFrom\n\
	llFleeFrom($***REMOVED***1:vector position***REMOVED***, $***REMOVED***2:float distance***REMOVED***, $***REMOVED***3:list options***REMOVED***);\n\
snippet llFloor\n\
	llFloor($***REMOVED***1:float val***REMOVED***)\n\
snippet llForceMouselook\n\
	llForceMouselook($***REMOVED***1:integer mouselook***REMOVED***);\n\
snippet llFrand\n\
	llFrand($***REMOVED***1:float mag***REMOVED***)\n\
snippet llGenerateKey\n\
	llGenerateKey()\n\
snippet llGetAccel\n\
	llGetAccel()\n\
snippet llGetAgentInfo\n\
	llGetAgentInfo($***REMOVED***1:key id***REMOVED***)\n\
snippet llGetAgentLanguage\n\
	llGetAgentLanguage($***REMOVED***1:key agent***REMOVED***)\n\
snippet llGetAgentList\n\
	llGetAgentList($***REMOVED***1:integer scope***REMOVED***, $***REMOVED***2:list options***REMOVED***)\n\
snippet llGetAgentSize\n\
	llGetAgentSize($***REMOVED***1:key agent***REMOVED***)\n\
snippet llGetAlpha\n\
	llGetAlpha($***REMOVED***1:integer face***REMOVED***)\n\
snippet llGetAndResetTime\n\
	llGetAndResetTime()\n\
snippet llGetAnimation\n\
	llGetAnimation($***REMOVED***1:key id***REMOVED***)\n\
snippet llGetAnimationList\n\
	llGetAnimationList($***REMOVED***1:key agent***REMOVED***)\n\
snippet llGetAnimationOverride\n\
	llGetAnimationOverride($***REMOVED***1:string anim_state***REMOVED***)\n\
snippet llGetAttached\n\
	llGetAttached()\n\
snippet llGetBoundingBox\n\
	llGetBoundingBox($***REMOVED***1:key object***REMOVED***)\n\
snippet llGetCameraPos\n\
	llGetCameraPos()\n\
snippet llGetCameraRot\n\
	llGetCameraRot()\n\
snippet llGetCenterOfMass\n\
	llGetCenterOfMass()\n\
snippet llGetClosestNavPoint\n\
	llGetClosestNavPoint($***REMOVED***1:vector point***REMOVED***, $***REMOVED***2:list options***REMOVED***)\n\
snippet llGetColor\n\
	llGetColor($***REMOVED***1:integer face***REMOVED***)\n\
snippet llGetCreator\n\
	llGetCreator()\n\
snippet llGetDate\n\
	llGetDate()\n\
snippet llGetDisplayName\n\
	llGetDisplayName($***REMOVED***1:key id***REMOVED***)\n\
snippet llGetEnergy\n\
	llGetEnergy()\n\
snippet llGetEnv\n\
	llGetEnv($***REMOVED***1:string name***REMOVED***)\n\
snippet llGetForce\n\
	llGetForce()\n\
snippet llGetFreeMemory\n\
	llGetFreeMemory()\n\
snippet llGetFreeURLs\n\
	llGetFreeURLs()\n\
snippet llGetGeometricCenter\n\
	llGetGeometricCenter()\n\
snippet llGetGMTclock\n\
	llGetGMTclock()\n\
snippet llGetHTTPHeader\n\
	llGetHTTPHeader($***REMOVED***1:key request_id***REMOVED***, $***REMOVED***2:string header***REMOVED***)\n\
snippet llGetInventoryCreator\n\
	llGetInventoryCreator($***REMOVED***1:string item***REMOVED***)\n\
snippet llGetInventoryKey\n\
	llGetInventoryKey($***REMOVED***1:string name***REMOVED***)\n\
snippet llGetInventoryName\n\
	llGetInventoryName($***REMOVED***1:integer type***REMOVED***, $***REMOVED***2:integer number***REMOVED***)\n\
snippet llGetInventoryNumber\n\
	llGetInventoryNumber($***REMOVED***1:integer type***REMOVED***)\n\
snippet llGetInventoryPermMask\n\
	llGetInventoryPermMask($***REMOVED***1:string item***REMOVED***, $***REMOVED***2:integer mask***REMOVED***)\n\
snippet llGetInventoryType\n\
	llGetInventoryType($***REMOVED***1:string name***REMOVED***)\n\
snippet llGetKey\n\
	llGetKey()\n\
snippet llGetLandOwnerAt\n\
	llGetLandOwnerAt($***REMOVED***1:vector pos***REMOVED***)\n\
snippet llGetLinkKey\n\
	llGetLinkKey($***REMOVED***1:integer link***REMOVED***)\n\
snippet llGetLinkMedia\n\
	llGetLinkMedia($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:integer face***REMOVED***, $***REMOVED***3:list params***REMOVED***)\n\
snippet llGetLinkName\n\
	llGetLinkName($***REMOVED***1:integer link***REMOVED***)\n\
snippet llGetLinkNumber\n\
	llGetLinkNumber()\n\
snippet llGetLinkNumberOfSides\n\
	llGetLinkNumberOfSides($***REMOVED***1:integer link***REMOVED***)\n\
snippet llGetLinkPrimitiveParams\n\
	llGetLinkPrimitiveParams($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:list params***REMOVED***)\n\
snippet llGetListEntryType\n\
	llGetListEntryType($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer index***REMOVED***)\n\
snippet llGetListLength\n\
	llGetListLength($***REMOVED***1:list src***REMOVED***)\n\
snippet llGetLocalPos\n\
	llGetLocalPos()\n\
snippet llGetLocalRot\n\
	llGetLocalRot()\n\
snippet llGetMass\n\
	llGetMass()\n\
snippet llGetMassMKS\n\
	llGetMassMKS()\n\
snippet llGetMaxScaleFactor\n\
	llGetMaxScaleFactor()\n\
snippet llGetMemoryLimit\n\
	llGetMemoryLimit()\n\
snippet llGetMinScaleFactor\n\
	llGetMinScaleFactor()\n\
snippet llGetNextEmail\n\
	llGetNextEmail($***REMOVED***1:string address***REMOVED***, $***REMOVED***2:string subject***REMOVED***);\n\
snippet llGetNotecardLine\n\
	llGetNotecardLine($***REMOVED***1:string name***REMOVED***, $***REMOVED***2:integer line***REMOVED***)\n\
snippet llGetNumberOfNotecardLines\n\
	llGetNumberOfNotecardLines($***REMOVED***1:string name***REMOVED***)\n\
snippet llGetNumberOfPrims\n\
	llGetNumberOfPrims()\n\
snippet llGetNumberOfSides\n\
	llGetNumberOfSides()\n\
snippet llGetObjectDesc\n\
	llGetObjectDesc()\n\
snippet llGetObjectDetails\n\
	llGetObjectDetails($***REMOVED***1:key id***REMOVED***, $***REMOVED***2:list params***REMOVED***)\n\
snippet llGetObjectMass\n\
	llGetObjectMass($***REMOVED***1:key id***REMOVED***)\n\
snippet llGetObjectName\n\
	llGetObjectName()\n\
snippet llGetObjectPermMask\n\
	llGetObjectPermMask($***REMOVED***1:integer mask***REMOVED***)\n\
snippet llGetObjectPrimCount\n\
	llGetObjectPrimCount($***REMOVED***1:key prim***REMOVED***)\n\
snippet llGetOmega\n\
	llGetOmega()\n\
snippet llGetOwner\n\
	llGetOwner()\n\
snippet llGetOwnerKey\n\
	llGetOwnerKey($***REMOVED***1:key id***REMOVED***)\n\
snippet llGetParcelDetails\n\
	llGetParcelDetails($***REMOVED***1:vector pos***REMOVED***, $***REMOVED***2:list params***REMOVED***)\n\
snippet llGetParcelFlags\n\
	llGetParcelFlags($***REMOVED***1:vector pos***REMOVED***)\n\
snippet llGetParcelMaxPrims\n\
	llGetParcelMaxPrims($***REMOVED***1:vector pos***REMOVED***, $***REMOVED***2:integer sim_wide***REMOVED***)\n\
snippet llGetParcelMusicURL\n\
	llGetParcelMusicURL()\n\
snippet llGetParcelPrimCount\n\
	llGetParcelPrimCount($***REMOVED***1:vector pos***REMOVED***, $***REMOVED***2:integer category***REMOVED***, $***REMOVED***3:integer sim_wide***REMOVED***)\n\
snippet llGetParcelPrimOwners\n\
	llGetParcelPrimOwners($***REMOVED***1:vector pos***REMOVED***)\n\
snippet llGetPermissions\n\
	llGetPermissions()\n\
snippet llGetPermissionsKey\n\
	llGetPermissionsKey()\n\
snippet llGetPhysicsMaterial\n\
	llGetPhysicsMaterial()\n\
snippet llGetPos\n\
	llGetPos()\n\
snippet llGetPrimitiveParams\n\
	llGetPrimitiveParams($***REMOVED***1:list params***REMOVED***)\n\
snippet llGetPrimMediaParams\n\
	llGetPrimMediaParams($***REMOVED***1:integer face***REMOVED***, $***REMOVED***2:list params***REMOVED***)\n\
snippet llGetRegionAgentCount\n\
	llGetRegionAgentCount()\n\
snippet llGetRegionCorner\n\
	llGetRegionCorner()\n\
snippet llGetRegionFlags\n\
	llGetRegionFlags()\n\
snippet llGetRegionFPS\n\
	llGetRegionFPS()\n\
snippet llGetRegionName\n\
	llGetRegionName()\n\
snippet llGetRegionTimeDilation\n\
	llGetRegionTimeDilation()\n\
snippet llGetRootPosition\n\
	llGetRootPosition()\n\
snippet llGetRootRotation\n\
	llGetRootRotation()\n\
snippet llGetRot\n\
	llGetRot()\n\
snippet llGetScale\n\
	llGetScale()\n\
snippet llGetScriptName\n\
	llGetScriptName()\n\
snippet llGetScriptState\n\
	llGetScriptState($***REMOVED***1:string script***REMOVED***)\n\
snippet llGetSimStats\n\
	llGetSimStats($***REMOVED***1:integer stat_type***REMOVED***)\n\
snippet llGetSimulatorHostname\n\
	llGetSimulatorHostname()\n\
snippet llGetSPMaxMemory\n\
	llGetSPMaxMemory()\n\
snippet llGetStartParameter\n\
	llGetStartParameter()\n\
snippet llGetStaticPath\n\
	llGetStaticPath($***REMOVED***1:vector start***REMOVED***, $***REMOVED***2:vector end***REMOVED***, $***REMOVED***3:float radius***REMOVED***, $***REMOVED***4:list params***REMOVED***)\n\
snippet llGetStatus\n\
	llGetStatus($***REMOVED***1:integer status***REMOVED***)\n\
snippet llGetSubString\n\
	llGetSubString($***REMOVED***1:string src***REMOVED***, $***REMOVED***2:integer start***REMOVED***, $***REMOVED***3:integer end***REMOVED***)\n\
snippet llGetSunDirection\n\
	llGetSunDirection()\n\
snippet llGetTexture\n\
	llGetTexture($***REMOVED***1:integer face***REMOVED***)\n\
snippet llGetTextureOffset\n\
	llGetTextureOffset($***REMOVED***1:integer face***REMOVED***)\n\
snippet llGetTextureRot\n\
	llGetTextureRot($***REMOVED***1:integer face***REMOVED***)\n\
snippet llGetTextureScale\n\
	llGetTextureScale($***REMOVED***1:integer face***REMOVED***)\n\
snippet llGetTime\n\
	llGetTime()\n\
snippet llGetTimeOfDay\n\
	llGetTimeOfDay()\n\
snippet llGetTimestamp\n\
	llGetTimestamp()\n\
snippet llGetTorque\n\
	llGetTorque()\n\
snippet llGetUnixTime\n\
	llGetUnixTime()\n\
snippet llGetUsedMemory\n\
	llGetUsedMemory()\n\
snippet llGetUsername\n\
	llGetUsername($***REMOVED***1:key id***REMOVED***)\n\
snippet llGetVel\n\
	llGetVel()\n\
snippet llGetWallclock\n\
	llGetWallclock()\n\
snippet llGiveInventory\n\
	llGiveInventory($***REMOVED***1:key destination***REMOVED***, $***REMOVED***2:string inventory***REMOVED***);\n\
snippet llGiveInventoryList\n\
	llGiveInventoryList($***REMOVED***1:key target***REMOVED***, $***REMOVED***2:string folder***REMOVED***, $***REMOVED***3:list inventory***REMOVED***);\n\
snippet llGiveMoney\n\
	llGiveMoney($***REMOVED***1:key destination***REMOVED***, $***REMOVED***2:integer amount***REMOVED***)\n\
snippet llGround\n\
	llGround($***REMOVED***1:vector offset***REMOVED***)\n\
snippet llGroundContour\n\
	llGroundContour($***REMOVED***1:vector offset***REMOVED***)\n\
snippet llGroundNormal\n\
	llGroundNormal($***REMOVED***1:vector offset***REMOVED***)\n\
snippet llGroundRepel\n\
	llGroundRepel($***REMOVED***1:float height***REMOVED***, $***REMOVED***2:integer water***REMOVED***, $***REMOVED***3:float tau***REMOVED***);\n\
snippet llGroundSlope\n\
	llGroundSlope($***REMOVED***1:vector offset***REMOVED***)\n\
snippet llHTTPRequest\n\
	llHTTPRequest($***REMOVED***1:string url***REMOVED***, $***REMOVED***2:list parameters***REMOVED***, $***REMOVED***3:string body***REMOVED***)\n\
snippet llHTTPResponse\n\
	llHTTPResponse($***REMOVED***1:key request_id***REMOVED***, $***REMOVED***2:integer status***REMOVED***, $***REMOVED***3:string body***REMOVED***);\n\
snippet llInsertString\n\
	llInsertString($***REMOVED***1:string dst***REMOVED***, $***REMOVED***2:integer pos***REMOVED***, $***REMOVED***3:string src***REMOVED***)\n\
snippet llInstantMessage\n\
	llInstantMessage($***REMOVED***1:key user***REMOVED***, $***REMOVED***2:string message***REMOVED***);\n\
snippet llIntegerToBase64\n\
	llIntegerToBase64($***REMOVED***1:integer number***REMOVED***)\n\
snippet llJson2List\n\
	llJson2List($***REMOVED***1:string json***REMOVED***)\n\
snippet llJsonGetValue\n\
	llJsonGetValue($***REMOVED***1:string json***REMOVED***, $***REMOVED***2:list specifiers***REMOVED***)\n\
snippet llJsonSetValue\n\
	llJsonSetValue($***REMOVED***1:string json***REMOVED***, $***REMOVED***2:list specifiers***REMOVED***, $***REMOVED***3:string newValue***REMOVED***)\n\
snippet llJsonValueType\n\
	llJsonValueType($***REMOVED***1:string json***REMOVED***, $***REMOVED***2:list specifiers***REMOVED***)\n\
snippet llKey2Name\n\
	llKey2Name($***REMOVED***1:key id***REMOVED***)\n\
snippet llLinkParticleSystem\n\
	llLinkParticleSystem($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:list rules***REMOVED***);\n\
snippet llLinkSitTarget\n\
	llLinkSitTarget($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:vector offset***REMOVED***, $***REMOVED***3:rotation rot***REMOVED***);\n\
snippet llList2CSV\n\
	llList2CSV($***REMOVED***1:list src***REMOVED***)\n\
snippet llList2Float\n\
	llList2Float($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer index***REMOVED***)\n\
snippet llList2Integer\n\
	llList2Integer($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer index***REMOVED***)\n\
snippet llList2Json\n\
	llList2Json($***REMOVED***1:string type***REMOVED***, $***REMOVED***2:list values***REMOVED***)\n\
snippet llList2Key\n\
	llList2Key($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer index***REMOVED***)\n\
snippet llList2List\n\
	llList2List($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer start***REMOVED***, $***REMOVED***3:integer end***REMOVED***)\n\
snippet llList2ListStrided\n\
	llList2ListStrided($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer start***REMOVED***, $***REMOVED***3:integer end***REMOVED***, $***REMOVED***4:integer stride***REMOVED***)\n\
snippet llList2Rot\n\
	llList2Rot($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer index***REMOVED***)\n\
snippet llList2String\n\
	llList2String($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer index***REMOVED***)\n\
snippet llList2Vector\n\
	llList2Vector($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer index***REMOVED***)\n\
snippet llListen\n\
	llListen($***REMOVED***1:integer channel***REMOVED***, $***REMOVED***2:string name***REMOVED***, $***REMOVED***3:key id***REMOVED***, $***REMOVED***4:string msg***REMOVED***)\n\
snippet llListenControl\n\
	llListenControl($***REMOVED***1:integer handle***REMOVED***, $***REMOVED***2:integer active***REMOVED***);\n\
snippet llListenRemove\n\
	llListenRemove($***REMOVED***1:integer handle***REMOVED***);\n\
snippet llListFindList\n\
	llListFindList($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:list test***REMOVED***)\n\
snippet llListInsertList\n\
	llListInsertList($***REMOVED***1:list dest***REMOVED***, $***REMOVED***2:list src***REMOVED***, $***REMOVED***3:integer start***REMOVED***)\n\
snippet llListRandomize\n\
	llListRandomize($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer stride***REMOVED***)\n\
snippet llListReplaceList\n\
	llListReplaceList($***REMOVED***1:list dest***REMOVED***, $***REMOVED***2:list src***REMOVED***, $***REMOVED***3:integer start***REMOVED***, $***REMOVED***4:integer end***REMOVED***)\n\
snippet llListSort\n\
	llListSort($***REMOVED***1:list src***REMOVED***, $***REMOVED***2:integer stride***REMOVED***, $***REMOVED***3:integer ascending***REMOVED***)\n\
snippet llListStatistics\n\
	llListStatistics($***REMOVED***1:integer operation***REMOVED***, $***REMOVED***2:list src***REMOVED***)\n\
snippet llLoadURL\n\
	llLoadURL($***REMOVED***1:key agent***REMOVED***, $***REMOVED***2:string message***REMOVED***, $***REMOVED***3:string url***REMOVED***);\n\
snippet llLog\n\
	llLog($***REMOVED***1:float val***REMOVED***)\n\
snippet llLog10\n\
	llLog10($***REMOVED***1:float val***REMOVED***)\n\
snippet llLookAt\n\
	llLookAt($***REMOVED***1:vector target***REMOVED***, $***REMOVED***2:float strength***REMOVED***, $***REMOVED***3:float damping***REMOVED***);\n\
snippet llLoopSound\n\
	llLoopSound($***REMOVED***1:string sound***REMOVED***, $***REMOVED***2:float volume***REMOVED***);\n\
snippet llLoopSoundMaster\n\
	llLoopSoundMaster($***REMOVED***1:string sound***REMOVED***, $***REMOVED***2:float volume***REMOVED***);\n\
snippet llLoopSoundSlave\n\
	llLoopSoundSlave($***REMOVED***1:string sound***REMOVED***, $***REMOVED***2:float volume***REMOVED***);\n\
snippet llManageEstateAccess\n\
	llManageEstateAccess($***REMOVED***1:integer action***REMOVED***, $***REMOVED***2:key agent***REMOVED***)\n\
snippet llMapDestination\n\
	llMapDestination($***REMOVED***1:string simname***REMOVED***, $***REMOVED***2:vector pos***REMOVED***, $***REMOVED***3:vector look_at***REMOVED***);\n\
snippet llMD5String\n\
	llMD5String($***REMOVED***1:string src***REMOVED***, $***REMOVED***2:integer nonce***REMOVED***)\n\
snippet llMessageLinked\n\
	llMessageLinked($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:integer num***REMOVED***, $***REMOVED***3:string str***REMOVED***, $***REMOVED***4:key id***REMOVED***);\n\
snippet llMinEventDelay\n\
	llMinEventDelay($***REMOVED***1:float delay***REMOVED***);\n\
snippet llModifyLand\n\
	llModifyLand($***REMOVED***1:integer action***REMOVED***, $***REMOVED***2:integer brush***REMOVED***);\n\
snippet llModPow\n\
	llModPow($***REMOVED***1:integer a***REMOVED***, $***REMOVED***2:integer b***REMOVED***, $***REMOVED***3:integer c***REMOVED***)\n\
snippet llMoveToTarget\n\
	llMoveToTarget($***REMOVED***1:vector target***REMOVED***, $***REMOVED***2:float tau***REMOVED***);\n\
snippet llNavigateTo\n\
	llNavigateTo($***REMOVED***1:vector pos***REMOVED***, $***REMOVED***2:list options***REMOVED***);\n\
snippet llOffsetTexture\n\
	llOffsetTexture($***REMOVED***1:float u***REMOVED***, $***REMOVED***2:float v***REMOVED***, $***REMOVED***3:integer face***REMOVED***);\n\
snippet llOpenRemoteDataChannel\n\
	llOpenRemoteDataChannel();\n\
snippet llOverMyLand\n\
	llOverMyLand($***REMOVED***1:key id***REMOVED***)\n\
snippet llOwnerSay\n\
	llOwnerSay($***REMOVED***1:string msg***REMOVED***);\n\
snippet llParcelMediaCommandList\n\
	llParcelMediaCommandList($***REMOVED***1:list commandList***REMOVED***);\n\
snippet llParcelMediaQuery\n\
	llParcelMediaQuery($***REMOVED***1:list query***REMOVED***)\n\
snippet llParseString2List\n\
	llParseString2List($***REMOVED***1:string src***REMOVED***, $***REMOVED***2:list separators***REMOVED***, $***REMOVED***3:list spacers***REMOVED***)\n\
snippet llParseStringKeepNulls\n\
	llParseStringKeepNulls($***REMOVED***1:string src***REMOVED***, $***REMOVED***2:list separators***REMOVED***, $***REMOVED***3:list spacers***REMOVED***)\n\
snippet llParticleSystem\n\
	llParticleSystem($***REMOVED***1:list rules***REMOVED***);\n\
snippet llPassCollisions\n\
	llPassCollisions($***REMOVED***1:integer pass***REMOVED***);\n\
snippet llPassTouches\n\
	llPassTouches($***REMOVED***1:integer pass***REMOVED***);\n\
snippet llPatrolPoints\n\
	llPatrolPoints($***REMOVED***1:list patrolPoints***REMOVED***, $***REMOVED***2:list options***REMOVED***);\n\
snippet llPlaySound\n\
	llPlaySound($***REMOVED***1:string sound***REMOVED***, $***REMOVED***2:float volume***REMOVED***);\n\
snippet llPlaySoundSlave\n\
	llPlaySoundSlave($***REMOVED***1:string sound***REMOVED***, $***REMOVED***2:float volume***REMOVED***);\n\
snippet llPow\n\
	llPow($***REMOVED***1:float base***REMOVED***, $***REMOVED***2:float exponent***REMOVED***)\n\
snippet llPreloadSound\n\
	llPreloadSound($***REMOVED***1:string sound***REMOVED***);\n\
snippet llPursue\n\
	llPursue($***REMOVED***1:key target***REMOVED***, $***REMOVED***2:list options***REMOVED***);\n\
snippet llPushObject\n\
	llPushObject($***REMOVED***1:key target***REMOVED***, $***REMOVED***2:vector impulse***REMOVED***, $***REMOVED***3:vector ang_impulse***REMOVED***, $***REMOVED***4:integer local***REMOVED***);\n\
snippet llRegionSay\n\
	llRegionSay($***REMOVED***1:integer channel***REMOVED***, $***REMOVED***2:string msg***REMOVED***);\n\
snippet llRegionSayTo\n\
	llRegionSayTo($***REMOVED***1:key target***REMOVED***, $***REMOVED***2:integer channel***REMOVED***, $***REMOVED***3:string msg***REMOVED***);\n\
snippet llReleaseControls\n\
	llReleaseControls();\n\
snippet llReleaseURL\n\
	llReleaseURL($***REMOVED***1:string url***REMOVED***);\n\
snippet llRemoteDataReply\n\
	llRemoteDataReply($***REMOVED***1:key channel***REMOVED***, $***REMOVED***2:key message_id***REMOVED***, $***REMOVED***3:string sdata***REMOVED***, $***REMOVED***4:integer idata***REMOVED***);\n\
snippet llRemoteLoadScriptPin\n\
	llRemoteLoadScriptPin($***REMOVED***1:key target***REMOVED***, $***REMOVED***2:string name***REMOVED***, $***REMOVED***3:integer pin***REMOVED***, $***REMOVED***4:integer running***REMOVED***, $***REMOVED***5:integer start_param***REMOVED***);\n\
snippet llRemoveFromLandBanList\n\
	llRemoveFromLandBanList($***REMOVED***1:key agent***REMOVED***);\n\
snippet llRemoveFromLandPassList\n\
	llRemoveFromLandPassList($***REMOVED***1:key agent***REMOVED***);\n\
snippet llRemoveInventory\n\
	llRemoveInventory($***REMOVED***1:string item***REMOVED***);\n\
snippet llRemoveVehicleFlags\n\
	llRemoveVehicleFlags($***REMOVED***1:integer flags***REMOVED***);\n\
snippet llRequestAgentData\n\
	llRequestAgentData($***REMOVED***1:key id***REMOVED***, $***REMOVED***2:integer data***REMOVED***)\n\
snippet llRequestDisplayName\n\
	llRequestDisplayName($***REMOVED***1:key id***REMOVED***)\n\
snippet llRequestInventoryData\n\
	llRequestInventoryData($***REMOVED***1:string name***REMOVED***)\n\
snippet llRequestPermissions\n\
	llRequestPermissions($***REMOVED***1:key agent***REMOVED***, $***REMOVED***2:integer permissions***REMOVED***)\n\
snippet llRequestSecureURL\n\
	llRequestSecureURL()\n\
snippet llRequestSimulatorData\n\
	llRequestSimulatorData($***REMOVED***1:string region***REMOVED***, $***REMOVED***2:integer data***REMOVED***)\n\
snippet llRequestURL\n\
	llRequestURL()\n\
snippet llRequestUsername\n\
	llRequestUsername($***REMOVED***1:key id***REMOVED***)\n\
snippet llResetAnimationOverride\n\
	llResetAnimationOverride($***REMOVED***1:string anim_state***REMOVED***);\n\
snippet llResetLandBanList\n\
	llResetLandBanList();\n\
snippet llResetLandPassList\n\
	llResetLandPassList();\n\
snippet llResetOtherScript\n\
	llResetOtherScript($***REMOVED***1:string name***REMOVED***);\n\
snippet llResetScript\n\
	llResetScript();\n\
snippet llResetTime\n\
	llResetTime();\n\
snippet llReturnObjectsByID\n\
	llReturnObjectsByID($***REMOVED***1:list objects***REMOVED***)\n\
snippet llReturnObjectsByOwner\n\
	llReturnObjectsByOwner($***REMOVED***1:key owner***REMOVED***, $***REMOVED***2:integer scope***REMOVED***)\n\
snippet llRezAtRoot\n\
	llRezAtRoot($***REMOVED***1:string inventory***REMOVED***, $***REMOVED***2:vector position***REMOVED***, $***REMOVED***3:vector velocity***REMOVED***, $***REMOVED***4:rotation rot***REMOVED***, $***REMOVED***5:integer param***REMOVED***);\n\
snippet llRezObject\n\
	llRezObject($***REMOVED***1:string inventory***REMOVED***, $***REMOVED***2:vector pos***REMOVED***, $***REMOVED***3:vector vel***REMOVED***, $***REMOVED***4:rotation rot***REMOVED***, $***REMOVED***5:integer param***REMOVED***);\n\
snippet llRot2Angle\n\
	llRot2Angle($***REMOVED***1:rotation rot***REMOVED***)\n\
snippet llRot2Axis\n\
	llRot2Axis($***REMOVED***1:rotation rot***REMOVED***)\n\
snippet llRot2Euler\n\
	llRot2Euler($***REMOVED***1:rotation quat***REMOVED***)\n\
snippet llRot2Fwd\n\
	llRot2Fwd($***REMOVED***1:rotation q***REMOVED***)\n\
snippet llRot2Left\n\
	llRot2Left($***REMOVED***1:rotation q***REMOVED***)\n\
snippet llRot2Up\n\
	llRot2Up($***REMOVED***1:rotation q***REMOVED***)\n\
snippet llRotateTexture\n\
	llRotateTexture($***REMOVED***1:float angle***REMOVED***, $***REMOVED***2:integer face***REMOVED***);\n\
snippet llRotBetween\n\
	llRotBetween($***REMOVED***1:vector start***REMOVED***, $***REMOVED***2:vector end***REMOVED***)\n\
snippet llRotLookAt\n\
	llRotLookAt($***REMOVED***1:rotation target_direction***REMOVED***, $***REMOVED***2:float strength***REMOVED***, $***REMOVED***3:float damping***REMOVED***);\n\
snippet llRotTarget\n\
	llRotTarget($***REMOVED***1:rotation rot***REMOVED***, $***REMOVED***2:float error***REMOVED***)\n\
snippet llRotTargetRemove\n\
	llRotTargetRemove($***REMOVED***1:integer handle***REMOVED***);\n\
snippet llRound\n\
	llRound($***REMOVED***1:float val***REMOVED***)\n\
snippet llSameGroup\n\
	llSameGroup($***REMOVED***1:key group***REMOVED***)\n\
snippet llSay\n\
	llSay($***REMOVED***1:integer channel***REMOVED***, $***REMOVED***2:string msg***REMOVED***);\n\
snippet llScaleByFactor\n\
	llScaleByFactor($***REMOVED***1:float scaling_factor***REMOVED***)\n\
snippet llScaleTexture\n\
	llScaleTexture($***REMOVED***1:float u***REMOVED***, $***REMOVED***2:float v***REMOVED***, $***REMOVED***3:integer face***REMOVED***);\n\
snippet llScriptDanger\n\
	llScriptDanger($***REMOVED***1:vector pos***REMOVED***)\n\
snippet llScriptProfiler\n\
	llScriptProfiler($***REMOVED***1:integer flags***REMOVED***);\n\
snippet llSendRemoteData\n\
	llSendRemoteData($***REMOVED***1:key channel***REMOVED***, $***REMOVED***2:string dest***REMOVED***, $***REMOVED***3:integer idata***REMOVED***, $***REMOVED***4:string sdata***REMOVED***)\n\
snippet llSensor\n\
	llSensor($***REMOVED***1:string name***REMOVED***, $***REMOVED***2:key id***REMOVED***, $***REMOVED***3:integer type***REMOVED***, $***REMOVED***4:float range***REMOVED***, $***REMOVED***5:float arc***REMOVED***);\n\
snippet llSensorRepeat\n\
	llSensorRepeat($***REMOVED***1:string name***REMOVED***, $***REMOVED***2:key id***REMOVED***, $***REMOVED***3:integer type***REMOVED***, $***REMOVED***4:float range***REMOVED***, $***REMOVED***5:float arc***REMOVED***, $***REMOVED***6:float rate***REMOVED***);\n\
snippet llSetAlpha\n\
	llSetAlpha($***REMOVED***1:float alpha***REMOVED***, $***REMOVED***2:integer face***REMOVED***);\n\
snippet llSetAngularVelocity\n\
	llSetAngularVelocity($***REMOVED***1:vector force***REMOVED***, $***REMOVED***2:integer local***REMOVED***);\n\
snippet llSetAnimationOverride\n\
	llSetAnimationOverride($***REMOVED***1:string anim_state***REMOVED***, $***REMOVED***2:string anim***REMOVED***)\n\
snippet llSetBuoyancy\n\
	llSetBuoyancy($***REMOVED***1:float buoyancy***REMOVED***);\n\
snippet llSetCameraAtOffset\n\
	llSetCameraAtOffset($***REMOVED***1:vector offset***REMOVED***);\n\
snippet llSetCameraEyeOffset\n\
	llSetCameraEyeOffset($***REMOVED***1:vector offset***REMOVED***);\n\
snippet llSetCameraParams\n\
	llSetCameraParams($***REMOVED***1:list rules***REMOVED***);\n\
snippet llSetClickAction\n\
	llSetClickAction($***REMOVED***1:integer action***REMOVED***);\n\
snippet llSetColor\n\
	llSetColor($***REMOVED***1:vector color***REMOVED***, $***REMOVED***2:integer face***REMOVED***);\n\
snippet llSetContentType\n\
	llSetContentType($***REMOVED***1:key request_id***REMOVED***, $***REMOVED***2:integer content_type***REMOVED***);\n\
snippet llSetDamage\n\
	llSetDamage($***REMOVED***1:float damage***REMOVED***);\n\
snippet llSetForce\n\
	llSetForce($***REMOVED***1:vector force***REMOVED***, $***REMOVED***2:integer local***REMOVED***);\n\
snippet llSetForceAndTorque\n\
	llSetForceAndTorque($***REMOVED***1:vector force***REMOVED***, $***REMOVED***2:vector torque***REMOVED***, $***REMOVED***3:integer local***REMOVED***);\n\
snippet llSetHoverHeight\n\
	llSetHoverHeight($***REMOVED***1:float height***REMOVED***, $***REMOVED***2:integer water***REMOVED***, $***REMOVED***3:float tau***REMOVED***);\n\
snippet llSetKeyframedMotion\n\
	llSetKeyframedMotion($***REMOVED***1:list keyframes***REMOVED***, $***REMOVED***2:list options***REMOVED***);\n\
snippet llSetLinkAlpha\n\
	llSetLinkAlpha($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:float alpha***REMOVED***, $***REMOVED***3:integer face***REMOVED***);\n\
snippet llSetLinkCamera\n\
	llSetLinkCamera($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:vector eye***REMOVED***, $***REMOVED***3:vector at***REMOVED***);\n\
snippet llSetLinkColor\n\
	llSetLinkColor($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:vector color***REMOVED***, $***REMOVED***3:integer face***REMOVED***);\n\
snippet llSetLinkMedia\n\
	llSetLinkMedia($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:integer face***REMOVED***, $***REMOVED***3:list params***REMOVED***);\n\
snippet llSetLinkPrimitiveParams\n\
	llSetLinkPrimitiveParams($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:list rules***REMOVED***);\n\
snippet llSetLinkPrimitiveParamsFast\n\
	llSetLinkPrimitiveParamsFast($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:list rules***REMOVED***);\n\
snippet llSetLinkTexture\n\
	llSetLinkTexture($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:string texture***REMOVED***, $***REMOVED***3:integer face***REMOVED***);\n\
snippet llSetLinkTextureAnim\n\
	llSetLinkTextureAnim($***REMOVED***1:integer link***REMOVED***, $***REMOVED***2:integer mode***REMOVED***, $***REMOVED***3:integer face***REMOVED***, $***REMOVED***4:integer sizex***REMOVED***, $***REMOVED***5:integer sizey***REMOVED***, $***REMOVED***6:float start***REMOVED***, $***REMOVED***7:float length***REMOVED***, $***REMOVED***8:float rate***REMOVED***);\n\
snippet llSetLocalRot\n\
	llSetLocalRot($***REMOVED***1:rotation rot***REMOVED***);\n\
snippet llSetMemoryLimit\n\
	llSetMemoryLimit($***REMOVED***1:integer limit***REMOVED***)\n\
snippet llSetObjectDesc\n\
	llSetObjectDesc($***REMOVED***1:string description***REMOVED***);\n\
snippet llSetObjectName\n\
	llSetObjectName($***REMOVED***1:string name***REMOVED***);\n\
snippet llSetParcelMusicURL\n\
	llSetParcelMusicURL($***REMOVED***1:string url***REMOVED***);\n\
snippet llSetPayPrice\n\
	llSetPayPrice($***REMOVED***1:integer price***REMOVED***, [$***REMOVED***2:integer price_button_a***REMOVED***, $***REMOVED***3:integer price_button_b***REMOVED***, $***REMOVED***4:integer price_button_c***REMOVED***, $***REMOVED***5:integer price_button_d***REMOVED***]);\n\
snippet llSetPhysicsMaterial\n\
	llSetPhysicsMaterial($***REMOVED***1:integer mask***REMOVED***, $***REMOVED***2:float gravity_multiplier***REMOVED***, $***REMOVED***3:float restitution***REMOVED***, $***REMOVED***4:float friction***REMOVED***, $***REMOVED***5:float density***REMOVED***);\n\
snippet llSetPos\n\
	llSetPos($***REMOVED***1:vector pos***REMOVED***);\n\
snippet llSetPrimitiveParams\n\
	llSetPrimitiveParams($***REMOVED***1:list rules***REMOVED***);\n\
snippet llSetPrimMediaParams\n\
	llSetPrimMediaParams($***REMOVED***1:integer face***REMOVED***, $***REMOVED***2:list params***REMOVED***);\n\
snippet llSetRegionPos\n\
	llSetRegionPos($***REMOVED***1:vector position***REMOVED***)\n\
snippet llSetRemoteScriptAccessPin\n\
	llSetRemoteScriptAccessPin($***REMOVED***1:integer pin***REMOVED***);\n\
snippet llSetRot\n\
	llSetRot($***REMOVED***1:rotation rot***REMOVED***);\n\
snippet llSetScale\n\
	llSetScale($***REMOVED***1:vector size***REMOVED***);\n\
snippet llSetScriptState\n\
	llSetScriptState($***REMOVED***1:string name***REMOVED***, $***REMOVED***2:integer run***REMOVED***);\n\
snippet llSetSitText\n\
	llSetSitText($***REMOVED***1:string text***REMOVED***);\n\
snippet llSetSoundQueueing\n\
	llSetSoundQueueing($***REMOVED***1:integer queue***REMOVED***);\n\
snippet llSetSoundRadius\n\
	llSetSoundRadius($***REMOVED***1:float radius***REMOVED***);\n\
snippet llSetStatus\n\
	llSetStatus($***REMOVED***1:integer status***REMOVED***, $***REMOVED***2:integer value***REMOVED***);\n\
snippet llSetText\n\
	llSetText($***REMOVED***1:string text***REMOVED***, $***REMOVED***2:vector color***REMOVED***, $***REMOVED***3:float alpha***REMOVED***);\n\
snippet llSetTexture\n\
	llSetTexture($***REMOVED***1:string texture***REMOVED***, $***REMOVED***2:integer face***REMOVED***);\n\
snippet llSetTextureAnim\n\
	llSetTextureAnim($***REMOVED***1:integer mode***REMOVED***, $***REMOVED***2:integer face***REMOVED***, $***REMOVED***3:integer sizex***REMOVED***, $***REMOVED***4:integer sizey***REMOVED***, $***REMOVED***5:float start***REMOVED***, $***REMOVED***6:float length***REMOVED***, $***REMOVED***7:float rate***REMOVED***);\n\
snippet llSetTimerEvent\n\
	llSetTimerEvent($***REMOVED***1:float sec***REMOVED***);\n\
snippet llSetTorque\n\
	llSetTorque($***REMOVED***1:vector torque***REMOVED***, $***REMOVED***2:integer local***REMOVED***);\n\
snippet llSetTouchText\n\
	llSetTouchText($***REMOVED***1:string text***REMOVED***);\n\
snippet llSetVehicleFlags\n\
	llSetVehicleFlags($***REMOVED***1:integer flags***REMOVED***);\n\
snippet llSetVehicleFloatParam\n\
	llSetVehicleFloatParam($***REMOVED***1:integer param***REMOVED***, $***REMOVED***2:float value***REMOVED***);\n\
snippet llSetVehicleRotationParam\n\
	llSetVehicleRotationParam($***REMOVED***1:integer param***REMOVED***, $***REMOVED***2:rotation rot***REMOVED***);\n\
snippet llSetVehicleType\n\
	llSetVehicleType($***REMOVED***1:integer type***REMOVED***);\n\
snippet llSetVehicleVectorParam\n\
	llSetVehicleVectorParam($***REMOVED***1:integer param***REMOVED***, $***REMOVED***2:vector vec***REMOVED***);\n\
snippet llSetVelocity\n\
	llSetVelocity($***REMOVED***1:vector force***REMOVED***, $***REMOVED***2:integer local***REMOVED***);\n\
snippet llSHA1String\n\
	llSHA1String($***REMOVED***1:string src***REMOVED***)\n\
snippet llShout\n\
	llShout($***REMOVED***1:integer channel***REMOVED***, $***REMOVED***2:string msg***REMOVED***);\n\
snippet llSin\n\
	llSin($***REMOVED***1:float theta***REMOVED***)\n\
snippet llSitTarget\n\
	llSitTarget($***REMOVED***1:vector offset***REMOVED***, $***REMOVED***2:rotation rot***REMOVED***);\n\
snippet llSleep\n\
	llSleep($***REMOVED***1:float sec***REMOVED***);\n\
snippet llSqrt\n\
	llSqrt($***REMOVED***1:float val***REMOVED***)\n\
snippet llStartAnimation\n\
	llStartAnimation($***REMOVED***1:string anim***REMOVED***);\n\
snippet llStopAnimation\n\
	llStopAnimation($***REMOVED***1:string anim***REMOVED***);\n\
snippet llStopHover\n\
	llStopHover();\n\
snippet llStopLookAt\n\
	llStopLookAt();\n\
snippet llStopMoveToTarget\n\
	llStopMoveToTarget();\n\
snippet llStopSound\n\
	llStopSound();\n\
snippet llStringLength\n\
	llStringLength($***REMOVED***1:string str***REMOVED***)\n\
snippet llStringToBase64\n\
	llStringToBase64($***REMOVED***1:string str***REMOVED***)\n\
snippet llStringTrim\n\
	llStringTrim($***REMOVED***1:string src***REMOVED***, $***REMOVED***2:integer type***REMOVED***)\n\
snippet llSubStringIndex\n\
	llSubStringIndex($***REMOVED***1:string source***REMOVED***, $***REMOVED***2:string pattern***REMOVED***)\n\
snippet llTakeControls\n\
	llTakeControls($***REMOVED***1:integer controls***REMOVED***, $***REMOVED***2:integer accept***REMOVED***, $***REMOVED***3:integer pass_on***REMOVED***);\n\
snippet llTan\n\
	llTan($***REMOVED***1:float theta***REMOVED***)\n\
snippet llTarget\n\
	llTarget($***REMOVED***1:vector position***REMOVED***, $***REMOVED***2:float range***REMOVED***)\n\
snippet llTargetOmega\n\
	llTargetOmega($***REMOVED***1:vector axis***REMOVED***, $***REMOVED***2:float spinrate***REMOVED***, $***REMOVED***3:float gain***REMOVED***);\n\
snippet llTargetRemove\n\
	llTargetRemove($***REMOVED***1:integer handle***REMOVED***);\n\
snippet llTeleportAgent\n\
	llTeleportAgent($***REMOVED***1:key agent***REMOVED***, $***REMOVED***2:string landmark***REMOVED***, $***REMOVED***3:vector position***REMOVED***, $***REMOVED***4:vector look_at***REMOVED***);\n\
snippet llTeleportAgentGlobalCoords\n\
	llTeleportAgentGlobalCoords($***REMOVED***1:key agent***REMOVED***, $***REMOVED***2:vector global_coordinates***REMOVED***, $***REMOVED***3:vector region_coordinates***REMOVED***, $***REMOVED***4:vector look_at***REMOVED***);\n\
snippet llTeleportAgentHome\n\
	llTeleportAgentHome($***REMOVED***1:key agent***REMOVED***);\n\
snippet llTextBox\n\
	llTextBox($***REMOVED***1:key agent***REMOVED***, $***REMOVED***2:string message***REMOVED***, $***REMOVED***3:integer channel***REMOVED***);\n\
snippet llToLower\n\
	llToLower($***REMOVED***1:string src***REMOVED***)\n\
snippet llToUpper\n\
	llToUpper($***REMOVED***1:string src***REMOVED***)\n\
snippet llTransferLindenDollars\n\
	llTransferLindenDollars($***REMOVED***1:key destination***REMOVED***, $***REMOVED***2:integer amount***REMOVED***)\n\
snippet llTriggerSound\n\
	llTriggerSound($***REMOVED***1:string sound***REMOVED***, $***REMOVED***2:float volume***REMOVED***);\n\
snippet llTriggerSoundLimited\n\
	llTriggerSoundLimited($***REMOVED***1:string sound***REMOVED***, $***REMOVED***2:float volume***REMOVED***, $***REMOVED***3:vector top_north_east***REMOVED***, $***REMOVED***4:vector bottom_south_west***REMOVED***);\n\
snippet llUnescapeURL\n\
	llUnescapeURL($***REMOVED***1:string url***REMOVED***)\n\
snippet llUnSit\n\
	llUnSit($***REMOVED***1:key id***REMOVED***);\n\
snippet llUpdateCharacter\n\
	llUpdateCharacter($***REMOVED***1:list options***REMOVED***)\n\
snippet llVecDist\n\
	llVecDist($***REMOVED***1:vector vec_a***REMOVED***, $***REMOVED***2:vector vec_b***REMOVED***)\n\
snippet llVecMag\n\
	llVecMag($***REMOVED***1:vector vec***REMOVED***)\n\
snippet llVecNorm\n\
	llVecNorm($***REMOVED***1:vector vec***REMOVED***)\n\
snippet llVolumeDetect\n\
	llVolumeDetect($***REMOVED***1:integer detect***REMOVED***);\n\
snippet llWanderWithin\n\
	llWanderWithin($***REMOVED***1:vector origin***REMOVED***, $***REMOVED***2:vector dist***REMOVED***, $***REMOVED***3:list options***REMOVED***);\n\
snippet llWater\n\
	llWater($***REMOVED***1:vector offset***REMOVED***);\n\
snippet llWhisper\n\
	llWhisper($***REMOVED***1:integer channel***REMOVED***, $***REMOVED***2:string msg***REMOVED***);\n\
snippet llWind\n\
	llWind($***REMOVED***1:vector offset***REMOVED***);\n\
snippet llXorBase64\n\
	llXorBase64($***REMOVED***1:string str1***REMOVED***, $***REMOVED***2:string str2***REMOVED***)\n\
snippet money\n\
	money($***REMOVED***1:key id***REMOVED***, $***REMOVED***2:integer amount***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet object_rez\n\
	object_rez($***REMOVED***1:key id***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet on_rez\n\
	on_rez($***REMOVED***1:integer start_param***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet path_update\n\
	path_update($***REMOVED***1:integer type***REMOVED***, $***REMOVED***2:list reserved***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet remote_data\n\
	remote_data($***REMOVED***1:integer event_type***REMOVED***, $***REMOVED***2:key channel***REMOVED***, $***REMOVED***3:key message_id***REMOVED***, $***REMOVED***4:string sender***REMOVED***, $***REMOVED***5:integer idata***REMOVED***, $***REMOVED***6:string sdata***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet run_time_permissions\n\
	run_time_permissions($***REMOVED***1:integer perm***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet sensor\n\
	sensor($***REMOVED***1:integer index***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet state\n\
	state $***REMOVED***1:name***REMOVED***\n\
snippet touch\n\
	touch($***REMOVED***1:integer index***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet touch_end\n\
	touch_end($***REMOVED***1:integer index***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet touch_start\n\
	touch_start($***REMOVED***1:integer index***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet transaction_result\n\
	transaction_result($***REMOVED***1:key id***REMOVED***, $***REMOVED***2:integer success***REMOVED***, $***REMOVED***3:string data***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
snippet while\n\
	while ($***REMOVED***1:condition***REMOVED***)\n\
	***REMOVED***\n\
		$0\n\
	***REMOVED***\n\
";
exports.scope = "lsl";

***REMOVED***);
