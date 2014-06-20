/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define('ace/mode/mel', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/mel_highlight_rules', 'ace/mode/behaviour/cstyle', 'ace/mode/folding/cstyle'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var MELHighlightRules = require("./mel_highlight_rules").MELHighlightRules;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() ***REMOVED***
    this.HighlightRules = MELHighlightRules;
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
***REMOVED***;
oop.inherits(Mode, TextMode);

(function() ***REMOVED***

    this.lineCommentStart = "//";
    this.blockComment = ***REMOVED***start: "/*", end: "*/"***REMOVED***;
    this.$id = "ace/mode/mel";
***REMOVED***).call(Mode.prototype);

exports.Mode = Mode;

***REMOVED***);

define('ace/mode/mel_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) ***REMOVED***


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var MELHighlightRules = function() ***REMOVED***

    this.$rules = ***REMOVED*** start: 
       [ ***REMOVED*** caseInsensitive: true,
           token: 'storage.type.mel',
           regex: '\\b(matrix|string|vector|float|int|void)\\b' ***REMOVED***,
         ***REMOVED*** caseInsensitive: true,
           token: 'support.function.mel',
           regex: '\\b((s(h(ow(ManipCtx|S(hadingGroupAttrEditor|electionInTitle)|H(idden|elp)|Window)|el(f(Button|TabLayout|Layout)|lField)|ading(GeometryRelCtx|Node|Connection|LightRelCtx))|y(s(tem|File)|mbol(Button|CheckBox))|nap(shot|Mode|2to2 |TogetherCtx|Key)|c(ulpt|ene(UIReplacement|Editor)|ale(BrushBrightness |Constraint|Key(Ctx)?)?|r(ipt(Node|Ctx|Table|edPanel(Type)?|Job|EditorInfo)|oll(Field|Layout))|mh)|t(itch(Surface(Points)?|AndExplodeShell )|a(ckTrace|rt(sWith |String ))|r(cmp|i(ng(ToStringArray |Array(Remove(Duplicates | )|C(ount |atenate )|ToString |Intersector))|p )|oke))|i(n(gleProfileBirailSurface)?|ze|gn|mplify)|o(u(nd(Control)?|rce)|ft(Mod(Ctx)?)?|rt)|u(perCtx|rface(S(haderList|ampler))?|b(st(itute(Geometry|AllString )?|ring)|d(M(irror|a(tchTopology|p(SewMove|Cut)))|iv(Crease|DisplaySmoothness)?|C(ollapse|leanTopology)|T(o(Blind|Poly)|ransferUVsToCache)|DuplicateAndConnect|EditUV|ListComponentConversion|AutoProjection)))|p(h(ere|rand)|otLight(PreviewPort)?|aceLocator|r(ing|eadSheetEditor))|e(t(s|MenuMode|Sta(te |rtupMessage|mpDensity )|NodeTypeFlag|ConstraintRestPosition |ToolTo|In(putDeviceMapping|finity)|D(ynamic|efaultShadingGroup|rivenKeyframe)|UITemplate|P(ar(ticleAttr|ent)|roject )|E(scapeCtx|dit(or|Ctx))|Key(Ctx|frame|Path)|F(ocus|luidAttr)|Attr(Mapping)?)|parator|ed|l(ect(Mode|ionConnection|Context|Type|edNodes|Pr(iority|ef)|Key(Ctx)?)?|LoadSettings)|archPathArray )|kin(Cluster|Percent)|q(uareSurface|rt)|w(itchTable|atchDisplayPort)|a(ve(Menu|Shelf|ToolSettings|I(nitialState|mage)|Pref(s|Objects)|Fluid|A(ttrPreset |llShelves))|mpleImage)|rtContext|mooth(step|Curve|TangentSurface))|h(sv_to_rgb|yp(ot|er(Graph|Shade|Panel))|i(tTest|de|lite)|ot(Box|key(Check)?)|ud(Button|Slider(Button)?)|e(lp(Line)?|adsUpDisplay|rmite)|wRe(nder(Load)?|flectionMap)|ard(enPointCurve|ware(RenderPanel)?))|n(o(nLinear|ise|de(Type|IconButton|Outliner|Preset)|rmal(ize |Constraint))|urbs(Boolean|S(elect|quare)|C(opyUVSet|ube)|To(Subdiv|Poly(gonsPref)?)|Plane|ViewDirectionVector )|ew(ton|PanelItems)|ame(space(Info)?|Command|Field))|c(h(oice|dir|eck(Box(Grp)?|DefaultRenderGlobals)|a(n(nelBox|geSubdiv(Region|ComponentDisplayLevel))|racter(Map|OutlineEditor)?))|y(cleCheck|linder)|tx(Completion|Traverse|EditMode|Abort)|irc(ularFillet|le)|o(s|n(str(uctionHistory|ain(Value)?)|nect(ionInfo|Control|Dynamic|Joint|Attr)|t(extInfo|rol)|dition|e|vert(SolidTx|Tessellation|Unit|FromOldLayers |Lightmap)|firmDialog)|py(SkinWeights|Key|Flexor|Array )|l(or(Slider(Grp|ButtonGrp)|Index(SliderGrp)?|Editor|AtPoint)?|umnLayout|lision)|arsenSubdivSelectionList|m(p(onentEditor|utePolysetVolume |actHairSystem )|mand(Port|Echo|Line)))|u(tKey|r(ve(MoveEPCtx|SketchCtx|CVCtx|Intersect|OnSurface|E(ditorCtx|PCtx)|AddPtCtx)?|rent(Ctx|Time(Ctx)?|Unit)))|p(GetSolverAttr|Button|S(olver(Types)?|e(t(SolverAttr|Edit)|am))|C(o(nstraint|llision)|ache)|Tool|P(anel|roperty))|eil|l(ip(Schedule(rOutliner)?|TrimBefore |Editor(CurrentTimeCtx)?)?|ose(Surface|Curve)|uster|ear(Cache)?|amp)|a(n(CreateManip|vas)|tch(Quiet)?|pitalizeString |mera(View)?)|r(oss(Product )?|eate(RenderLayer|MotionField |SubdivRegion|N(ode|ewShelf )|D(isplayLayer|rawCtx)|Editor))|md(Shell|FileOutput))|M(R(ender(ShadowData|Callback|Data|Util|View|Line(Array)?)|ampAttribute)|G(eometryData|lobal)|M(odelMessage|essage|a(nipData|t(erial|rix)))|BoundingBox|S(yntax|ceneMessage|t(atus|ring(Array)?)|imple|pace|elect(ion(Mask|List)|Info)|watchRender(Register|Base))|H(ardwareRenderer|WShaderSwatchGenerator)|NodeMessage|C(o(nditionMessage|lor(Array)?|m(putation|mand(Result|Message)))|ursor|loth(Material|S(ystem|olverRegister)|Con(straint|trol)|Triangle|Particle|Edge|Force)|allbackIdArray)|T(ypeId|ime(r(Message)?|Array)?|oolsInfo|esselationParams|r(imBoundaryArray|ansformationMatrix))|I(ntArray|t(Geometry|Mesh(Polygon|Edge|Vertex|FaceVertex)|S(urfaceCV|electionList)|CurveCV|Instancer|eratorType|D(ependency(Graph|Nodes)|ag)|Keyframe)|k(System|HandleGroup)|mage)|3dView|Object(SetMessage|Handle|Array)?|D(G(M(odifier|essage)|Context)|ynSwept(Triangle|Line)|istance|oubleArray|evice(State|Channel)|a(ta(Block|Handle)|g(M(odifier|essage)|Path(Array)?))|raw(Request(Queue)?|Info|Data|ProcedureBase))|U(serEventMessage|i(nt(Array|64Array)|Message))|P(o(int(Array)?|lyMessage)|lug(Array)?|rogressWindow|x(G(eometry(Iterator|Data)|lBuffer)|M(idiInputDevice|odelEditorCommand|anipContainer)|S(urfaceShape(UI)?|pringNode|electionContext)|HwShaderNode|Node|Co(ntext(Command)?|m(ponentShape|mand))|T(oolCommand|ransform(ationMatrix)?)|IkSolver(Node)?|3dModelView|ObjectSet|D(eformerNode|ata|ragAndDropBehavior)|PolyT(weakUVCommand|rg)|EmitterNode|F(i(eldNode|leTranslator)|luidEmitterNode)|LocatorNode))|E(ulerRotation|vent(Message)?)|ayatomr|Vector(Array)?|Quaternion|F(n(R(otateManip|eflectShader|adialField)|G(e(nericAttribute|ometry(Data|Filter))|ravityField)|M(otionPath|es(sageAttribute|h(Data)?)|a(nip3D|trix(Data|Attribute)))|B(l(innShader|endShapeDeformer)|ase)|S(caleManip|t(ateManip|ring(Data|ArrayData))|ingleIndexedComponent|ubd(Names|Data)?|p(hereData|otLight)|et|kinCluster)|HikEffector|N(on(ExtendedLight|AmbientLight)|u(rbs(Surface(Data)?|Curve(Data)?)|meric(Data|Attribute))|ewtonField)|C(haracter|ircleSweepManip|ompo(nent(ListData)?|undAttribute)|urveSegmentManip|lip|amera)|T(ypedAttribute|oggleManip|urbulenceField|r(ipleIndexedComponent|ansform))|I(ntArrayData|k(Solver|Handle|Joint|Effector))|D(ynSweptGeometryData|i(s(cManip|tanceManip)|rection(Manip|alLight))|ouble(IndexedComponent|ArrayData)|ependencyNode|a(ta|gNode)|ragField)|U(ni(tAttribute|formField)|Int64ArrayData)|P(hong(Shader|EShader)|oint(On(SurfaceManip|CurveManip)|Light|ArrayData)|fxGeometry|lugin(Data)?|arti(cleSystem|tion))|E(numAttribute|xpression)|V(o(lume(Light|AxisField)|rtexField)|ectorArrayData)|KeyframeDelta(Move|B(lockAddRemove|reakdown)|Scale|Tangent|InfType|Weighted|AddRemove)?|F(ield|luid|reePointTriadManip)|W(ireDeformer|eightGeometryFilter)|L(ight(DataAttribute)?|a(yeredShader|ttice(D(eformer|ata))?|mbertShader))|A(ni(sotropyShader|mCurve)|ttribute|irField|r(eaLight|rayAttrsData)|mbientLight))?|ile(IO|Object)|eedbackLine|loat(Matrix|Point(Array)?|Vector(Array)?|Array))|L(i(ghtLinks|brary)|ockMessage)|A(n(im(Message|C(ontrol|urveC(hange|lipboard(Item(Array)?)?))|Util)|gle)|ttribute(Spec(Array)?|Index)|r(rayData(Builder|Handle)|g(Database|Parser|List))))|t(hreePointArcCtx|ime(Control|Port|rX)|o(ol(Button|HasOptions|Collection|Dropped|PropertyWindow)|NativePath |upper|kenize(List )?|l(ower|erance)|rus|ggle(WindowVisibility|Axis)?)|u(rbulence|mble(Ctx)?)|ex(RotateContext|M(oveContext|anipContext)|t(ScrollList|Curves|ure(HairColor |DisplacePlane |PlacementContext|Window)|ToShelf |Field(Grp|ButtonGrp)?)?|S(caleContext|electContext|mudgeUVContext)|WinToolCtx)|woPointArcCtx|a(n(gentConstraint)?|bLayout)|r(im|unc(ate(HairCache|FluidCache))?|a(ns(formLimits|lator)|c(e|k(Ctx)?))))|i(s(olateSelect|Connected|True|Dirty|ParentOf |Valid(String |ObjectName |UiName )|AnimCurve )|n(s(tance(r)?|ert(Joint(Ctx)?|K(not(Surface|Curve)|eyCtx)))|heritTransform|t(S(crollBar|lider(Grp)?)|er(sect|nalVar|ToUI )|Field(Grp)?))|conText(Radio(Button|Collection)|Button|StaticLabel|CheckBox)|temFilter(Render|Type|Attr)?|prEngine|k(S(ystem(Info)?|olver|plineHandleCtx)|Handle(Ctx|DisplayScale)?|fkDisplayMethod)|m(portComposerCurves |fPlugins|age))|o(ceanNurbsPreviewPlane |utliner(Panel|Editor)|p(tion(Menu(Grp)?|Var)|en(GLExtension|MayaPref))|verrideModifier|ffset(Surface|Curve(OnSurface)?)|r(ientConstraint|bit(Ctx)?)|b(soleteProc |j(ect(Center|Type(UI)?|Layer )|Exists)))|d(yn(RelEd(itor|Panel)|Globals|C(ontrol|ache)|P(a(intEditor|rticleCtx)|ref)|Exp(ort|ression)|amicLoad)|i(s(connect(Joint|Attr)|tanceDim(Context|ension)|pla(y(RGBColor|S(tats|urface|moothness)|C(olor|ull)|Pref|LevelOfDetail|Affected)|cementToPoly)|kCache|able)|r(name |ect(ionalLight|KeyCtx)|map)|mWhen)|o(cServer|Blur|t(Product )?|ubleProfileBirailSurface|peSheetEditor|lly(Ctx)?)|uplicate(Surface|Curve)?|e(tach(Surface|Curve|DeviceAttr)|vice(Panel|Editor)|f(ine(DataServer|VirtualDevice)|ormer|ault(Navigation|LightListCheckBox))|l(ete(Sh(elfTab |adingGroupsAndMaterials )|U(nusedBrushes |I)|Attr)?|randstr)|g_to_rad)|agPose|r(opoffLocator|ag(gerContext)?)|g(timer|dirty|Info|eval))|CBG |u(serCtx|n(t(angleUV|rim)|i(t|form)|do(Info)?|loadPlugin|assignInputDevice|group)|iTemplate|p(dateAE |Axis)|v(Snapshot|Link))|joint(C(tx|luster)|DisplayScale|Lattice)?|p(sd(ChannelOutliner|TextureFile|E(ditTextureFile|xport))|close|i(c(ture|kWalk)|xelMove)|o(se|int(MatrixMult |C(onstraint|urveConstraint)|On(Surface|Curve)|Position|Light)|p(upMenu|en)|w|l(y(Reduce|GeoSampler|M(irrorFace|ove(UV|Edge|Vertex|Facet(UV)?)|erge(UV|Edge(Ctx)?|Vertex|Facet(Ctx)?)|ap(Sew(Move)?|Cut|Del))|B(oolOp|evel|l(indData|endColor))|S(traightenUVBorder|oftEdge|u(perCtx|bdivide(Edge|Facet))|p(her(icalProjection|e)|lit(Ring|Ctx|Edge|Vertex)?)|e(tToFaceNormal|parate|wEdge|lect(Constraint(Monitor)?|EditCtx))|mooth)|Normal(izeUV|PerVertex)?|C(hipOff|ylind(er|ricalProjection)|o(ne|pyUV|l(or(BlindData|Set|PerVertex)|lapse(Edge|Facet)))|u(t(Ctx)?|be)|l(ipboard|oseBorder)|acheMonitor|rea(seEdge|teFacet(Ctx)?))|T(o(Subdiv|rus)|r(iangulate|ansfer))|In(stallAction|fo)|Options|D(uplicate(Edge|AndConnect)|el(Edge|Vertex|Facet))|U(nite|VSet)|P(yramid|oke|lan(e|arProjection)|r(ism|ojection))|E(ditUV|valuate|xtrude(Edge|Facet))|Qu(eryBlindData|ad)|F(orceUV|lip(UV|Edge))|WedgeFace|L(istComponentConversion|ayoutUV)|A(utoProjection|ppend(Vertex|FacetCtx)?|verage(Normal|Vertex)))|eVectorConstraint))|utenv|er(cent|formanceOptions)|fxstrokes|wd|l(uginInfo|a(y(b(last|ackOptions))?|n(e|arSrf)))|a(steKey|ne(l(History|Configuration)?|Layout)|thAnimation|irBlend|use|lettePort|r(ti(cle(RenderInfo|Instancer|Exists)?|tion)|ent(Constraint)?|am(Dim(Context|ension)|Locator)))|r(int|o(j(ect(ion(Manip|Context)|Curve|Tangent)|FileViewer)|pMo(dCtx|ve)|gress(Bar|Window)|mptDialog)|eloadRefEd))|e(n(codeString|d(sWith |String )|v|ableDevice)|dit(RenderLayer(Globals|Members)|or(Template)?|DisplayLayer(Globals|Members)|AttrLimits )|v(ent|al(Deferred|Echo)?)|quivalent(Tol | )|ffector|r(f|ror)|x(clusiveLightCheckBox|t(end(Surface|Curve)|rude)|ists|p(ortComposerCurves |ression(EditorListen)?)?|ec(uteForEachObject )?|actWorldBoundingBox)|mit(ter)?)|v(i(sor|ew(Set|HeadOn|2dToolCtx|C(lipPlane|amera)|Place|Fit|LookAt))|o(lumeAxis|rtex)|e(ctorize|rifyCmd )|alidateShelfName )|key(Tangent|frame(Region(MoveKeyCtx|S(caleKeyCtx|e(tKeyCtx|lectKeyCtx))|CurrentTimeCtx|TrackCtx|InsertKeyCtx|D(irectKeyCtx|ollyCtx))|Stats|Outliner)?)|qu(it|erySubdiv)|f(c(heck|lose)|i(nd(RelatedSkinCluster |MenuItem |er|Keyframe|AllIntersections )|tBspline|l(ter(StudioImport|Curve|Expand)?|e(BrowserDialog|test|Info|Dialog|Extension )?|letCurve)|rstParentOf )|o(ntDialog|pen|rmLayout)|print|eof|flush|write|l(o(or|w|at(S(crollBar|lider(Grp|ButtonGrp|2)?)|Eq |Field(Grp)?))|u(shUndo|id(CacheInfo|Emitter|VoxelInfo))|exor)|r(omNativePath |e(eFormFillet|wind|ad)|ameLayout)|get(word|line)|mod)|w(hatIs|i(ndow(Pref)?|re(Context)?)|orkspace|ebBrowser(Prefs)?|a(itCursor|rning)|ri(nkle(Context)?|teTake))|l(s(T(hroughFilter|ype )|UI)?|i(st(Relatives|MenuAnnotation |Sets|History|NodeTypes|C(onnections|ameras)|Transforms |InputDevice(s|Buttons|Axes)|erEditor|DeviceAttachments|Unselected |A(nimatable|ttr))|n(step|eIntersection )|ght(link|List(Panel|Editor)?))|o(ckNode|okThru|ft|ad(NewShelf |P(lugin|refObjects)|Fluid)|g)|a(ssoContext|y(out|er(Button|ed(ShaderPort|TexturePort)))|ttice(DeformKeyCtx)?|unch(ImageEditor)?))|a(ssign(Command|InputDevice)|n(notate|im(C(one|urveEditor)|Display|View)|gle(Between)?)|tt(ach(Surface|Curve|DeviceAttr)|r(ibute(Menu|Info|Exists|Query)|NavigationControlGrp|Co(ntrolGrp|lorSliderGrp|mpatibility)|PresetEditWin|EnumOptionMenu(Grp)?|Field(Grp|SliderGrp)))|i(r|mConstraint)|d(d(NewShelfTab|Dynamic|PP|Attr(ibuteEditorNodeHelp)?)|vanceToNextDrivenKey)|uto(Place|Keyframe)|pp(endStringArray|l(y(Take|AttrPreset)|icationName))|ffect(s|edNet)|l(i(as(Attr)?|gn(Surface|C(tx|urve))?)|lViewFit)|r(c(len|Len(DimContext|gthDimension))|t(BuildPaintMenu|Se(tPaintCtx|lectCtx)|3dPaintCtx|UserPaintCtx|PuttyCtx|FluidAttrCtx|Attr(SkinPaintCtx|Ctx|PaintVertexCtx))|rayMapper)|mbientLight|b(s|out))|r(igid(Body|Solver)|o(t(at(ionInterpolation|e))?|otOf |undConstantRadius|w(ColumnLayout|Layout)|ll(Ctx)?)|un(up|TimeCommand)|e(s(olutionNode|et(Tool|AE )|ampleFluid)|hash|n(der(GlobalsNode|Manip|ThumbnailUpdate|Info|er|Partition|QualityNode|Window(SelectContext|Editor)|LayerButton)?|ame(SelectionList |UI|Attr)?)|cord(Device|Attr)|target|order(Deformers)?|do|v(olve|erse(Surface|Curve))|quires|f(ineSubdivSelectionList|erence(Edit|Query)?|resh(AE )?)|loadImage|adTake|root|move(MultiInstance|Joint)|build(Surface|Curve))|a(n(d(state|omizeFollicles )?|geControl)|d(i(o(MenuItemCollection|Button(Grp)?|Collection)|al)|_to_deg)|mpColorPort)|gb_to_hsv)|g(o(toBindPose |al)|e(t(M(odifiers|ayaPanelTypes )|Classification|InputDeviceRange|pid|env|DefaultBrush|Pa(nel|rticleAttr)|F(ileList|luidAttr)|A(ttr|pplicationVersionAsFloat ))|ometryConstraint)|l(Render(Editor)?|obalStitch)|a(uss|mma)|r(id(Layout)?|oup(ObjectsByName )?|a(dientControl(NoAttr)?|ph(SelectContext|TrackCtx|DollyCtx)|vity|bColor))|match)|x(pmPicker|form|bmLangPathList )|m(i(n(imizeApp)?|rrorJoint)|o(del(CurrentTimeCtx|Panel|Editor)|use|v(In|e(IKtoFK |VertexAlongDirection|KeyCtx)?|Out))|u(te|ltiProfileBirailSurface)|e(ssageLine|nu(BarLayout|Item(ToShelf )?|Editor)?|mory)|a(nip(Rotate(Context|LimitsCtx)|Move(Context|LimitsCtx)|Scale(Context|LimitsCtx)|Options)|tch|ke(Roll |SingleSurface|TubeOn |Identity|Paintable|bot|Live)|rker|g|x))|b(in(Membership|d(Skin|Pose))|o(neLattice|undary|x(ZoomCtx|DollyCtx))|u(tton(Manip)?|ild(BookmarkMenu|KeyframeMenu)|fferCurve)|e(ssel|vel(Plus)?)|l(indDataType|end(Shape(Panel|Editor)?|2|TwoAttr))|a(sename(Ex | )|tchRender|ke(Results|Simulation|Clip|PartialHistory|FluidShading )))))\\b' ***REMOVED***,
         ***REMOVED*** caseInsensitive: true,
           token: 'support.constant.mel',
           regex: '\\b(s(h(ellTessellate|a(d(ing(Map|Engine)|erGlow)|pe))|n(ow|apshot(Shape)?)|c(ulpt|aleConstraint|ript)|t(yleCurve|itch(Srf|AsNurbsShell)|u(cco|dioClearCoat)|encil|roke(Globals)?)|i(ngleShadingSwitch|mpleVolumeShader)|o(ftMod(Manip|Handle)?|lidFractal)|u(rface(Sha(der|pe)|Info|EdManip|VarGroup|Luminance)|b(Surface|d(M(odifier(UV|World)?|ap(SewMove|Cut|pingManip))|B(lindData|ase)|iv(ReverseFaces|SurfaceVarGroup|Co(llapse|mponentId)|To(Nurbs|Poly))?|HierBlind|CleanTopology|Tweak(UV)?|P(lanarProj|rojManip)|LayoutUV|A(ddTopology|utoProj))|Curve))|p(BirailSrf|otLight|ring)|e(tRange|lectionListOperator)|k(inCluster|etchPlane)|quareSrf|ampler(Info)?|m(ooth(Curve|TangentSrf)|ear))|h(svToRgb|yper(GraphInfo|View|Layout)|ik(Solver|Handle|Effector)|oldMatrix|eightField|w(Re(nderGlobals|flectionMap)|Shader)|a(ir(System|Constraint|TubeShader)|rd(enPoint|wareRenderGlobals)))|n(o(n(ExtendedLightShapeNode|Linear|AmbientLightShapeNode)|ise|rmalConstraint)|urbs(Surface|Curve|T(oSubdiv(Proc)?|essellate)|DimShape)|e(twork|wtonField))|c(h(o(ice|oser)|ecker|aracter(Map|Offset)?)|o(n(straint|tr(olPoint|ast)|dition)|py(ColorSet|UVSet))|urve(Range|Shape|Normalizer(Linear|Angle)?|In(tersect|fo)|VarGroup|From(Mesh(CoM|Edge)?|Su(rface(Bnd|CoS|Iso)?|bdiv(Edge|Face)?)))|l(ip(Scheduler|Library)|o(se(stPointOnSurface|Surface|Curve)|th|ud)|uster(Handle)?|amp)|amera(View)?|r(eate(BPManip|ColorSet|UVSet)|ater))|t(ime(ToUnitConversion|Function)?|oo(nLineAttributes|lDrawManip)|urbulenceField|ex(BaseDeformManip|ture(BakeSet|2d|ToGeom|3d|Env)|SmudgeUVManip|LatticeDeformManip)|weak|angentConstraint|r(i(pleShadingSwitch|m(WithBoundaries)?)|ansform(Geometry)?))|i(n(s(tancer|ertKnot(Surface|Curve))|tersectSurface)|k(RPsolver|MCsolver|S(ystem|olver|Csolver|plineSolver)|Handle|PASolver|Effector)|m(plicit(Box|Sphere|Cone)|agePlane))|o(cean(Shader)?|pticalFX|ffset(Surface|C(os|urve))|ldBlindDataBase|rient(Constraint|ationMarker)|bject(RenderFilter|MultiFilter|BinFilter|S(criptFilter|et)|NameFilter|TypeFilter|Filter|AttrFilter))|d(yn(Globals|Base)|i(s(tance(Between|DimShape)|pla(yLayer(Manager)?|cementShader)|kCache)|rect(ionalLight|edDisc)|mensionShape)|o(ubleShadingSwitch|f)|pBirailSrf|e(tach(Surface|Curve)|pendNode|f(orm(Bend|S(ine|quash)|Twist|ableShape|F(unc|lare)|Wave)|ault(RenderUtilityList|ShaderList|TextureList|LightList))|lete(Co(lorSet|mponent)|UVSet))|ag(Node|Pose)|r(opoffLocator|agField))|u(seBackground|n(trim|i(t(Conversion|ToTimeConversion)|formField)|known(Transform|Dag)?)|vChooser)|j(iggle|oint(Cluster|Ffd|Lattice)?)|p(sdFileTex|hong(E)?|o(s(tProcessList|itionMarker)|int(MatrixMult|Constraint|On(SurfaceInfo|CurveInfo)|Emitter|Light)|l(y(Reduce|M(irror|o(difier(UV|World)?|ve(UV|Edge|Vertex|Face(tUV)?))|erge(UV|Edge|Vert|Face)|ap(Sew(Move)?|Cut|Del))|B(oolOp|evel|lindData|ase)|S(traightenUVBorder|oftEdge|ubd(Edge|Face)|p(h(ere|Proj)|lit(Ring|Edge|Vert)?)|e(parate|wEdge)|mooth(Proxy|Face)?)|Normal(izeUV|PerVertex)?|C(hipOff|yl(inder|Proj)|o(ne|pyUV|l(orPerVertex|lapse(Edge|F)))|u(t(Manip(Container)?)?|be)|loseBorder|rea(seEdge|t(or|eFace)))|T(o(Subdiv|rus)|weak(UV)?|r(iangulate|ansfer))|OptUvs|D(uplicateEdge|el(Edge|Vertex|Facet))|Unite|P(yramid|oke(Manip)?|lan(e|arProj)|r(i(sm|mitive)|oj))|Extrude(Edge|Vertex|Face)|VertexNormalManip|Quad|Flip(UV|Edge)|WedgeFace|LayoutUV|A(utoProj|ppend(Vertex)?|verageVertex))|eVectorConstraint))|fx(Geometry|Hair|Toon)|l(usMinusAverage|a(n(e|arTrimSurface)|ce(2dTexture|3dTexture)))|a(ssMatrix|irBlend|r(ti(cle(SamplerInfo|C(olorMapper|loud)|TranspMapper|IncandMapper|AgeMapper)?|tion)|ent(Constraint|Tessellate)|amDimension))|r(imitive|o(ject(ion|Curve|Tangent)|xyManager)))|e(n(tity|v(Ball|ironmentFog|S(phere|ky)|C(hrome|ube)|Fog))|x(t(end(Surface|Curve)|rude)|p(lodeNurbsShell|ression)))|v(iewManip|o(lume(Shader|Noise|Fog|Light|AxisField)|rtexField)|e(ctor(RenderGlobals|Product)|rtexBakeSet))|quadShadingSwitch|f(i(tBspline|eld|l(ter(Resample|Simplify|ClosestSample|Euler)?|e|letCurve))|o(urByFourMatrix|llicle)|urPointOn(MeshInfo|Subd)|f(BlendSrf(Obsolete)?|d|FilletSrf)|l(ow|uid(S(hape|liceManip)|Texture(2D|3D)|Emitter)|exorShape)|ra(ctal|meCache))|w(tAddMatrix|ire|ood|eightGeometryFilter|ater|rap)|l(ight(Info|Fog|Li(st|nker))?|o(cator|okAt|d(Group|Thresholds)|ft)|uminance|ea(stSquaresModifier|ther)|a(yered(Shader|Texture)|ttice|mbert))|a(n(notationShape|i(sotropic|m(Blend(InOut)?|C(urve(T(T|U|L|A)|U(T|U|L|A))?|lip)))|gleBetween)|tt(ach(Surface|Curve)|rHierarchyTest)|i(rField|mConstraint)|dd(Matrix|DoubleLinear)|udio|vg(SurfacePoints|NurbsSurfacePoints|Curves)|lign(Manip|Surface|Curve)|r(cLengthDimension|tAttrPaintTest|eaLight|rayMapper)|mbientLight|bstractBase(NurbsConversion|Create))|r(igid(Body|Solver|Constraint)|o(ck|undConstantRadius)|e(s(olution|ultCurve(TimeTo(Time|Unitless|Linear|Angular))?)|nder(Rect|Globals(List)?|Box|Sphere|Cone|Quality|L(ight|ayer(Manager)?))|cord|v(olve(dPrimitive)?|erse(Surface|Curve)?)|f(erence|lect)|map(Hsv|Color|Value)|build(Surface|Curve))|a(dialField|mp(Shader)?)|gbToHsv|bfSrf)|g(uide|eo(Connect(or|able)|metry(Shape|Constraint|VarGroup|Filter))|lobal(Stitch|CacheControl)|ammaCorrect|r(id|oup(Id|Parts)|a(nite|vityField)))|Fur(Globals|Description|Feedback|Attractors)|xformManip|m(o(tionPath|untain|vie)|u(te|lt(Matrix|i(plyDivide|listerLight)|DoubleLinear))|pBirailSrf|e(sh(VarGroup)?|ntalray(Texture|IblShape))|a(terialInfo|ke(Group|Nurb(sSquare|Sphere|C(ylinder|ircle|one|ube)|Torus|Plane)|CircularArc|T(hreePointCircularArc|extCurves|woPointCircularArc))|rble))|b(irailSrf|o(neLattice|olean|undary(Base)?)|u(lge|mp(2d|3d))|evel(Plus)?|l(in(n|dDataTemplate)|end(Shape|Color(s|Sets)|TwoAttr|Device|Weighted)?)|a(se(GeometryVarGroup|ShadingSwitch|Lattice)|keSet)|r(ownian|ush)))\\b' ***REMOVED***,
         ***REMOVED*** caseInsensitive: true,
           token: 'keyword.control.mel',
           regex: '\\b(if|in|else|for|while|break|continue|case|default|do|switch|return|switch|case|source|catch|alias)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.other.mel', regex: '\\b(global)\\b' ***REMOVED***,
         ***REMOVED*** caseInsensitive: true,
           token: 'constant.language.mel',
           regex: '\\b(null|undefined)\\b' ***REMOVED***,
         ***REMOVED*** token: 'constant.numeric.mel',
           regex: '\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f)?\\b' ***REMOVED***,
         ***REMOVED*** token: 'punctuation.definition.string.begin.mel',
           regex: '"',
           push: 
            [ ***REMOVED*** token: 'constant.character.escape.mel', regex: '\\\\.' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.definition.string.end.mel',
                regex: '"',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.double.mel' ***REMOVED*** ] ***REMOVED***,
         
         ***REMOVED*** token: [ 'variable.other.mel', 'punctuation.definition.variable.mel' ],
           regex: '(\\$)([a-zA-Z_\\x7f-\\xff][a-zA-Z0-9_\\x7f-\\xff]*?\\b)' ***REMOVED***,
           
         ***REMOVED*** token: 'punctuation.definition.string.begin.mel',
           regex: '\'',
           push: 
            [ ***REMOVED*** token: 'constant.character.escape.mel', regex: '\\\\.' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.definition.string.end.mel',
                regex: '\'',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'string.quoted.single.mel' ***REMOVED*** ] ***REMOVED***,
         
         ***REMOVED*** token: 'constant.language.mel',
           regex: '\\b(false|true|yes|no|on|off)\\b' ***REMOVED***,
           
         ***REMOVED*** token: 'punctuation.definition.comment.mel',
           regex: '/\\*',
           push: 
            [ ***REMOVED*** token: 'punctuation.definition.comment.mel',
                regex: '\\*/',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'comment.block.mel' ***REMOVED*** ] ***REMOVED***,
         
         ***REMOVED*** token: [ 'comment.line.double-slash.mel', 'punctuation.definition.comment.mel' ],
           regex: '(//)(.*$\\n?)' ***REMOVED***,
           
         ***REMOVED*** caseInsensitive: true,
           token: 'keyword.operator.mel',
           regex: '\\b(instanceof)\\b' ***REMOVED***,
         ***REMOVED*** token: 'keyword.operator.symbolic.mel',
           regex: '[-\\!\\%\\&\\*\\+\\=\\/\\?\\:]' ***REMOVED***,
         
         ***REMOVED*** token: [ 'meta.preprocessor.mel', 'punctuation.definition.preprocessor.mel' ],
           regex: '(^[ \\t]*)((?:#)[a-zA-Z]+)' ***REMOVED***,
         
         ***REMOVED*** token: [ 'meta.function.mel', 'keyword.other.mel', 'storage.type.mel', 'entity.name.function.mel', 'punctuation.section.function.mel' ],
           regex: '((?:global\\s*)?proc)\\s*(\\w+\\s*\\[?\\]?\\s+|\\s+)([A-Za-z_][A-Za-z0-9_\\.]*)(\\s*(\\())',
           push: 
            [ ***REMOVED*** include: '$self' ***REMOVED***,
              ***REMOVED*** token: 'punctuation.section.function.mel',
                regex: '\\)',
                next: 'pop' ***REMOVED***,
              ***REMOVED*** defaultToken: 'meta.function.mel' ***REMOVED*** ] ***REMOVED***
              
              ] ***REMOVED***
    
    this.normalizeRules();
***REMOVED***;

oop.inherits(MELHighlightRules, TextHighlightRules);

exports.MELHighlightRules = MELHighlightRules;
***REMOVED***);

define('ace/mode/behaviour/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/behaviour', 'ace/token_iterator', 'ace/lib/lang'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var lang = require("../../lib/lang");

var SAFE_INSERT_IN_TOKENS =
    ["text", "paren.rparen", "punctuation.operator"];
var SAFE_INSERT_BEFORE_TOKENS =
    ["text", "paren.rparen", "punctuation.operator", "comment"];

var context;
var contextCache = ***REMOVED******REMOVED***
var initContext = function(editor) ***REMOVED***
    var id = -1;
    if (editor.multiSelect) ***REMOVED***
        id = editor.selection.id;
        if (contextCache.rangeCount != editor.multiSelect.rangeCount)
            contextCache = ***REMOVED***rangeCount: editor.multiSelect.rangeCount***REMOVED***;
***REMOVED***
    if (contextCache[id])
        return context = contextCache[id];
    context = contextCache[id] = ***REMOVED***
        autoInsertedBrackets: 0,
        autoInsertedRow: -1,
        autoInsertedLineEnd: "",
        maybeInsertedBrackets: 0,
        maybeInsertedRow: -1,
        maybeInsertedLineStart: "",
        maybeInsertedLineEnd: ""
***REMOVED***;
***REMOVED***;

var CstyleBehaviour = function() ***REMOVED***
    this.add("braces", "insertion", function(state, action, editor, session, text) ***REMOVED***
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (text == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "***REMOVED***" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '***REMOVED***' + selected + '***REMOVED***',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                if (/[\]\***REMOVED***\)]/.test(line[cursor.column]) || editor.inMultiSelectMode) ***REMOVED***
                    CstyleBehaviour.recordAutoInsert(editor, session, "***REMOVED***");
                    return ***REMOVED***
                        text: '***REMOVED******REMOVED***',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED*** else ***REMOVED***
                    CstyleBehaviour.recordMaybeInsert(editor, session, "***REMOVED***");
                    return ***REMOVED***
                        text: '***REMOVED***',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else if (text == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '***REMOVED***') ***REMOVED***
                var matching = session.$findOpeningBracket('***REMOVED***', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED*** else if (text == "\n" || text == "\r\n") ***REMOVED***
            initContext(editor);
            var closing = "";
            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) ***REMOVED***
                closing = lang.stringRepeat("***REMOVED***", context.maybeInsertedBrackets);
                CstyleBehaviour.clearMaybeInsertedClosing();
        ***REMOVED***
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === '***REMOVED***') ***REMOVED***
                var openBracePos = session.findMatchingBracket(***REMOVED***row: cursor.row, column: cursor.column+1***REMOVED***, '***REMOVED***');
                if (!openBracePos)
                     return null;
                var next_indent = this.$getIndent(session.getLine(openBracePos.row));
        ***REMOVED*** else if (closing) ***REMOVED***
                var next_indent = this.$getIndent(line);
        ***REMOVED*** else ***REMOVED***
                CstyleBehaviour.clearMaybeInsertedClosing();
                return;
        ***REMOVED***
            var indent = next_indent + session.getTabString();

            return ***REMOVED***
                text: '\n' + indent + '\n' + next_indent + closing,
                selection: [1, indent.length, 1, indent.length]
        ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
            CstyleBehaviour.clearMaybeInsertedClosing();
    ***REMOVED***
***REMOVED***);

    this.add("braces", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '***REMOVED***') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.end.column, range.end.column + 1);
            if (rightChar == '***REMOVED***') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED*** else ***REMOVED***
                context.maybeInsertedBrackets--;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("parens", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '(') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '(' + selected + ')',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                CstyleBehaviour.recordAutoInsert(editor, session, ")");
                return ***REMOVED***
                    text: '()',
                    selection: [1, 1]
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED*** else if (text == ')') ***REMOVED***
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ')') ***REMOVED***
                var matching = session.$findOpeningBracket(')', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("parens", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '(') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ')') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("brackets", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '[') ***REMOVED***
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: '[' + selected + ']',
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else if (CstyleBehaviour.isSaneInsertion(editor, session)) ***REMOVED***
                CstyleBehaviour.recordAutoInsert(editor, session, "]");
                return ***REMOVED***
                    text: '[]',
                    selection: [1, 1]
            ***REMOVED***;
        ***REMOVED***
    ***REMOVED*** else if (text == ']') ***REMOVED***
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ']') ***REMOVED***
                var matching = session.$findOpeningBracket(']', ***REMOVED***column: cursor.column + 1, row: cursor.row***REMOVED***);
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) ***REMOVED***
                    CstyleBehaviour.popAutoInsertedClosing();
                    return ***REMOVED***
                        text: '',
                        selection: [1, 1]
                ***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("brackets", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '[') ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ']') ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("string_dquotes", "insertion", function(state, action, editor, session, text) ***REMOVED***
        if (text == '"' || text == "'") ***REMOVED***
            initContext(editor);
            var quote = text;
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) ***REMOVED***
                return ***REMOVED***
                    text: quote + selected + quote,
                    selection: false
            ***REMOVED***;
        ***REMOVED*** else ***REMOVED***
                var cursor = editor.getCursorPosition();
                var line = session.doc.getLine(cursor.row);
                var leftChar = line.substring(cursor.column-1, cursor.column);
                if (leftChar == '\\') ***REMOVED***
                    return null;
            ***REMOVED***
                var tokens = session.getTokens(selection.start.row);
                var col = 0, token;
                var quotepos = -1; // Track whether we're inside an open quote.

                for (var x = 0; x < tokens.length; x++) ***REMOVED***
                    token = tokens[x];
                    if (token.type == "string") ***REMOVED***
                      quotepos = -1;
                ***REMOVED*** else if (quotepos < 0) ***REMOVED***
                      quotepos = token.value.indexOf(quote);
                ***REMOVED***
                    if ((token.value.length + col) > selection.start.column) ***REMOVED***
                        break;
                ***REMOVED***
                    col += tokens[x].value.length;
            ***REMOVED***
                if (!token || (quotepos < 0 && token.type !== "comment" && (token.type !== "string" || ((selection.start.column !== token.value.length+col-1) && token.value.lastIndexOf(quote) === token.value.length-1)))) ***REMOVED***
                    if (!CstyleBehaviour.isSaneInsertion(editor, session))
                        return;
                    return ***REMOVED***
                        text: quote + quote,
                        selection: [1,1]
                ***REMOVED***;
            ***REMOVED*** else if (token && token.type === "string") ***REMOVED***
                    var rightChar = line.substring(cursor.column, cursor.column + 1);
                    if (rightChar == quote) ***REMOVED***
                        return ***REMOVED***
                            text: '',
                            selection: [1, 1]
                    ***REMOVED***;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) ***REMOVED***
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) ***REMOVED***
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) ***REMOVED***
                range.end.column++;
                return range;
        ***REMOVED***
    ***REMOVED***
***REMOVED***);

***REMOVED***;

    
CstyleBehaviour.isSaneInsertion = function(editor, session) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var iterator = new TokenIterator(session, cursor.row, cursor.column);
    if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) ***REMOVED***
        var iterator2 = new TokenIterator(session, cursor.row, cursor.column + 1);
        if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS))
            return false;
***REMOVED***
    iterator.stepForward();
    return iterator.getCurrentTokenRow() !== cursor.row ||
        this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
***REMOVED***;

CstyleBehaviour.$matchTokenType = function(token, types) ***REMOVED***
    return types.indexOf(token.type || token) > -1;
***REMOVED***;

CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isAutoInsertedClosing(cursor, line, context.autoInsertedLineEnd[0]))
        context.autoInsertedBrackets = 0;
    context.autoInsertedRow = cursor.row;
    context.autoInsertedLineEnd = bracket + line.substr(cursor.column);
    context.autoInsertedBrackets++;
***REMOVED***;

CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) ***REMOVED***
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isMaybeInsertedClosing(cursor, line))
        context.maybeInsertedBrackets = 0;
    context.maybeInsertedRow = cursor.row;
    context.maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
    context.maybeInsertedLineEnd = line.substr(cursor.column);
    context.maybeInsertedBrackets++;
***REMOVED***;

CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) ***REMOVED***
    return context.autoInsertedBrackets > 0 &&
        cursor.row === context.autoInsertedRow &&
        bracket === context.autoInsertedLineEnd[0] &&
        line.substr(cursor.column) === context.autoInsertedLineEnd;
***REMOVED***;

CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) ***REMOVED***
    return context.maybeInsertedBrackets > 0 &&
        cursor.row === context.maybeInsertedRow &&
        line.substr(cursor.column) === context.maybeInsertedLineEnd &&
        line.substr(0, cursor.column) == context.maybeInsertedLineStart;
***REMOVED***;

CstyleBehaviour.popAutoInsertedClosing = function() ***REMOVED***
    context.autoInsertedLineEnd = context.autoInsertedLineEnd.substr(1);
    context.autoInsertedBrackets--;
***REMOVED***;

CstyleBehaviour.clearMaybeInsertedClosing = function() ***REMOVED***
    if (context) ***REMOVED***
        context.maybeInsertedBrackets = 0;
        context.maybeInsertedRow = -1;
***REMOVED***
***REMOVED***;



oop.inherits(CstyleBehaviour, Behaviour);

exports.CstyleBehaviour = CstyleBehaviour;
***REMOVED***);

define('ace/mode/folding/cstyle', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function(require, exports, module) ***REMOVED***


var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) ***REMOVED***
    if (commentRegex) ***REMOVED***
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
***REMOVED***
***REMOVED***;
oop.inherits(FoldMode, BaseFoldMode);

(function() ***REMOVED***

    this.foldingStartMarker = /(\***REMOVED***|\[)[^\***REMOVED***\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\***REMOVED***]*(\***REMOVED***|\])|^[\s\*]*(\*\/)/;

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) ***REMOVED***
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) ***REMOVED***
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) ***REMOVED***
                if (forceMultiline) ***REMOVED***
                    range = this.getSectionRange(session, row);
            ***REMOVED*** else if (foldStyle != "all")
                    range = null;
        ***REMOVED***
            
            return range;
    ***REMOVED***

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) ***REMOVED***
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
    ***REMOVED***
***REMOVED***;
    
    this.getSectionRange = function(session, row) ***REMOVED***
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) ***REMOVED***
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) ***REMOVED***
                if (subRange.start.row <= startRow) ***REMOVED***
                    break;
            ***REMOVED*** else if (subRange.isMultiLine()) ***REMOVED***
                    row = subRange.end.row;
            ***REMOVED*** else if (startIndent == indent) ***REMOVED***
                    break;
            ***REMOVED***
        ***REMOVED***
            endRow = row;
    ***REMOVED***
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
***REMOVED***;

***REMOVED***).call(FoldMode.prototype);

***REMOVED***);
