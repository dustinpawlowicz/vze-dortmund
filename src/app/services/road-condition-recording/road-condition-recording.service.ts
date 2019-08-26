import { ExportService, ExportOption } from './../export/export.service';
import { UserProperty } from './../../interfaces/user';
import { UserService } from './../user/user.service';
import { Storage } from '@ionic/storage';
import { IncompleteDataError } from './../../errors/incomplete-data-error';
import { RoadCondition } from './../../interfaces/road-condition';
import { Comment } from './../../interfaces/comment';
import { FetchedDataIncompleteError } from './../../errors/fetched-data-incomplete';
import { SingCategory } from '../../interfaces/sign';
import { Property } from './../../interfaces/property';
import { File } from '@ionic-native/file/ngx';
import { Picture } from './../../interfaces/picture';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IncompletePageDataError } from '../../errors/incomplete-page-data-error';
import { OrderPositions, StandardOrderPosition, SignageOrderPosition, CustomOrderPosition } from './../../interfaces/order-position';
import { HelperService } from './../helper/helper.service';
import { Edge } from './../../interfaces/edge';
import { ApiService } from './../api/api.service';
import { FetchDataError } from './../../errors/fetch-data-error';
import { CharacteristicGroup } from './../../interfaces/characteristic';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasicData } from './../../interfaces/basic-data';
import { Injectable } from '@angular/core';

enum Endpoint {
  CHARACTERISTICS = '/characteristics',
  SIGNS = '/signs',
  PRIORITIES = '/priorities',
  DEPARTEMENTS = '/departements',
  SURFACES = '/surfaces',
  COMMENTS = '/comments'
}

@Injectable({
  providedIn: 'root'
})
export class RoadConditionRecordingService {
  private readonly ROAD_CONDITION_KEY = 'road_conditions';
  private recordingEdge: Edge;
  private basicData: BasicData;
  private orderPositions: OrderPositions = new OrderPositions();
  private characteristicGroups: CharacteristicGroup[] = new Array<CharacteristicGroup>();
  private signCategories: SingCategory[] = new Array<SingCategory>();
  private priorities: Property[] = new Array<Property>();
  private departements: Property[] = new Array<Property>();
  private surfaces: Property[] = new Array<Property>();
  private comments: Comment[] = new Array<Comment>();

  private basicDataCompleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private characteristicsCompleted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: ApiService,
    private helperService: HelperService,
    private userService: UserService,
    private exportService: ExportService,
    private camera: Camera,
    private file: File,
    private storage: Storage) { }

  /**
   * prepareRecording - Prepare the visual recording by having the service set and fetch all necessary data.
   *
   * @param edge the edge to be set
   *
   * @return  a promise to be either resolved with the recording preparation result or rejected with an error
   */
  public prepareRecording(edge: Edge): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const [characteristicsResponse, signsResponse, prioritiesResponse,
          departementsResponse, surfacesResponse, commentsResponse] = await Promise.all([
          this.apiService.get(Endpoint.CHARACTERISTICS).toPromise(),
          this.apiService.get(Endpoint.SIGNS).toPromise(),
          this.apiService.get(Endpoint.PRIORITIES).toPromise(),
          this.apiService.get(Endpoint.DEPARTEMENTS).toPromise(),
          this.apiService.get(Endpoint.SURFACES).toPromise(),
          this.apiService.get(Endpoint.COMMENTS).toPromise()
        ]);

        if (!this.helperService.isSuccess(characteristicsResponse) || !this.helperService.isSuccess(signsResponse) ||
          !this.helperService.isSuccess(prioritiesResponse) || !this.helperService.isSuccess(departementsResponse) ||
          !this.helperService.isSuccess(surfacesResponse)) {
            throw new FetchDataError();
        }

        if (this.helperService.isSuccess(commentsResponse)) {
          this.setComments(commentsResponse.data.default_comments);
        } else {
          this.helperService.handleError(new FetchedDataIncompleteError());
        }

        this.orderPositions = new OrderPositions();
        this.recordingEdge = edge;
        this.setCharacteristicGroups(characteristicsResponse.data.characteristic_groups);
        this.setSigns(signsResponse.data.sign_categories);
        this.setPriorities(prioritiesResponse.data.priorities);
        this.setDepartements(departementsResponse.data.departements);
        this.setSurfaces(surfacesResponse.data.surfaces);

        resolve(!!(this.recordingEdge && this.characteristicGroups));
      } catch (error) {
        this.handleError(error);
        reject(error);
      }
    });
  }

  /**
   * setCharacteristicGroups - Set characteristic Groups.
   *
   * @jsonCharacteristicGroups  JSON of the characteristic groups to be set
   */
  private setCharacteristicGroups(jsonCharacteristicGroups: any): void {
    if (jsonCharacteristicGroups) {
      const characteristicGroups = new Array<CharacteristicGroup>();
      jsonCharacteristicGroups.forEach(element => {
        characteristicGroups.push(new CharacteristicGroup(element));
      });
      this.characteristicGroups = characteristicGroups;
    }
  }

  /**
   * setSigns - Set signs.
   *
   * @jsonSignCategories  JSON of the sign categories to be set
   */
  private setSigns(jsonSignCategories: any): void {
    if (jsonSignCategories) {
      const signCategories = new Array<SingCategory>();
      jsonSignCategories.forEach(element => {
        signCategories.push(new SingCategory(element));
      });
      this.signCategories = signCategories;
    }
  }

  /**
   * setPriorities - Set priorities.
   *
   * @jsonPriorities  JSON of the sign priorities to be set
   */
  private setPriorities(jsonPriorities: any): void {
    if (jsonPriorities) {
      const priorities = new Array<Property>();
      jsonPriorities.forEach(priority => {
        priorities.push(priority);
      });
      this.priorities = priorities;
    }
  }

  /**
   * setDepartements - Set departements.
   *
   * @jsonDepartements  JSON of the sign departements to be set
   */
  private setDepartements(jsonDepartements: any): void {
    if (jsonDepartements) {
      const departements = new Array<Property>();
      jsonDepartements.forEach(departement => {
        departements.push(departement);
      });
      this.departements = departements;
    }
  }

  /**
   * setSurfaces - Set surfaces.
   *
   * @jsonSurfaces  JSON of the sign surfaces to be set
   */
  private setSurfaces(jsonSurfaces: any): void {
    if (jsonSurfaces) {
      const surfaces = new Array<Property>();
      jsonSurfaces.forEach(surface => {
        surfaces.push(surface);
      });
      this.surfaces = surfaces;
    }
  }

  /**
   * setComments - Set comments.
   *
   * @jsonComments  JSON of the sign comments to be set
   */
  private setComments(jsonComments: any): void {
    if (jsonComments) {
      const comments = new Array<Comment>();
      jsonComments.forEach(comment => {
        comments.push(comment);
      });
      this.comments = comments;
    }
  }

  /**
   * cancelRecording - Cancel the process of registering a road condition.
   */
  public cancelRecording(): void {
    this.orderPositions = null;
    this.recordingEdge = null;
    this.clearBasicData();
    this.clearCharacteristics();
  }

  /**
   * getRecordingEdge - Get the edge of the current road condition recording.
   *
   * @return the current recording edge
   */
  public getRecordingEdge(): Edge {
    return this.recordingEdge;
  }

  /**
   * getMinHouseNumber - Specifies the smallest house number of the recording edge.
   */
  public getMinHouseNumber(): number {
    if (!this.recordingEdge) {
      throw new IncompletePageDataError();
    }

    // Check all numbers for min because the house number 'from' is not always smaller than the house number 'to'.
    const houseNumbers: number[] = [
      this.recordingEdge.houseNumberFromLeft,
      this.recordingEdge.houseNumberToLeft,
      this.recordingEdge.houseNumberFromRight,
      this.recordingEdge.houseNumberToRight
    ];

    let min: number = Math.min(...houseNumbers);
    if (min === Infinity) {
        min = 0;
    }

    return min;
  }

  /**
   * getMaxHouseNumber - Specifies the largest house number of the recording edge.
   */
  public getMaxHouseNumber(): number {
    if (!this.recordingEdge) {
      throw new IncompletePageDataError();
    }

    // Check all numbers for max because the house number 'from' is not always smaller than the house number 'to'.
    const houseNumbers: number[] = [
      this.recordingEdge.houseNumberFromLeft,
      this.recordingEdge.houseNumberToLeft,
      this.recordingEdge.houseNumberFromRight,
      this.recordingEdge.houseNumberToRight
    ];

    return Math.max(...houseNumbers);
  }

  /**
   * getLocation - Returns the location of the recording edge.
   */
  public getLocation(): string {
    if (!this.recordingEdge) {
      throw new IncompletePageDataError();
    }

    return this.recordingEdge.roadNumber + '-' + this.recordingEdge.sectionNumber;
  }

  /**
   * getRoadName - Returns the road name of the recording edge.
   */
  public getRoadName(): string {
    if (!this.recordingEdge) {
      throw new IncompletePageDataError();
    }

    return this.recordingEdge.roadName;
  }

  /**
   * getHouseNumberSectionLeft - Returns the house number section left of the recording edge.
   */
  public getHouseNumberSectionLeft(): string {
    if (!this.recordingEdge) {
      throw new IncompletePageDataError();
    }

    return this.recordingEdge.houseNumberFromLeft + '-' + this.recordingEdge.houseNumberToLeft;
  }

  /**
   * getHouseNumberSectionRight - Returns the house number section right of the recording edge.
   */
  public getHouseNumberSectionRight(): string {
    if (!this.recordingEdge) {
      throw new IncompletePageDataError();
    }

    return this.recordingEdge.houseNumberFromRight + '-' + this.recordingEdge.houseNumberToRight;
  }

  /**
   * getCharacteristicGroups - Observe whether the basic data is complete.
   */
  public getCharacteristicGroups(): CharacteristicGroup[] {
    if (!this.characteristicGroups) {
      throw new IncompletePageDataError();
    }

    return this.characteristicGroups;
  }

  /**
   * getSignGroups - Returns the sign groups.
   */
  public getSignGroups(): SingCategory[] {
    if (!this.signCategories) {
      throw new IncompletePageDataError();
    }

    return this.signCategories;
  }

  /**
   * getPriorities - Returns the priorities.
   */
  public getPriorities(): Property[] {
    if (!this.priorities) {
      throw new IncompletePageDataError();
    }

    return this.priorities;
  }

  /**
   * getDepartements - Returns the departements.
   */
  public getDepartements(): Property[] {
    if (!this.departements) {
      throw new IncompletePageDataError();
    }

    return this.departements;
  }

  /**
   * getSurfaces - Returns the surfaces.
   */
  public getSurfaces(): Property[] {
    if (!this.surfaces) {
      throw new IncompletePageDataError();
    }

    return this.surfaces;
  }

  /**
   * getComments - Returns the comments.
   */
  public getComments(): Comment[] {
    if (!this.comments) {
      throw new IncompletePageDataError();
    }

    return this.comments;
  }

  /**
   * getBasicDataCompleted - Observe whether the basic data is complete.
   */
  public getBasicDataCompleted(): Observable<boolean> {
    return this.basicDataCompleted.asObservable();
  }

  /**
   * getCharacteristicsCompleted - Observe whether the characteristics are complete.
   */
  public getCharacteristicsCompleted(): Observable<boolean> {
    return this.characteristicsCompleted.asObservable();
  }

  /**
   * completeBasicData - Set and complete the passed basic data.
   *
   * @data  the data to be set
   */
  public completeBasicData(data: any): void {
    this.basicData = new BasicData(data);
    this.basicDataCompleted.next(!!this.basicData);
  }

  /**
   * completeCharacteristics - Set the passed order positions and complete the characteristics.
   *
   * @orderPositions  the order positions to be set
   */
  public completeCharacteristics(orderPositions: OrderPositions): void {
    this.orderPositions = orderPositions;
    this.characteristicsCompleted.next(this.orderPositions.hasOrder());
  }

  /**
   * completeComments - Completes the road condition registration and stores the new road condition in the ionic storage.
   *
   * @comments  the comments to be set as part of the road condition
   */
  public async completeComments(comments: string[]): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const userProperty: UserProperty = await this.userService.getUserProperty();

        if (!this.basicData || !this.orderPositions.hasOrder() || !comments || !userProperty) {
          throw new IncompleteDataError();
        }

        const roadCondition: RoadCondition = new RoadCondition(this.basicData, this.orderPositions, comments, userProperty);
        let roadconditions: RoadCondition[] = await this.getRoadConditions();
        if (!roadconditions) {
          roadconditions = new Array<RoadCondition>();
        }

        roadconditions.push(roadCondition);
        resolve(this.storage.set(this.ROAD_CONDITION_KEY, JSON.stringify(roadconditions)));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * clearBasicData - clear the stored basic data
   */
  public clearBasicData(): void {
    this.basicData = null;
    this.basicDataCompleted.next(false);
  }

  /**
   * clearCharacteristics - clear the stored order positions
   */
  public clearCharacteristics(): void {
    this.orderPositions = null;
    this.characteristicsCompleted.next(false);
  }

  /**
   * getRoadConditions - Returns all records of the user from storage within a certain period of time.
   *                     New class instance required to get acces to the methods and properties
   *
   * @beginDate   start of time period
   * @endDate     end of time period
   * @asInstance  create new class instance for method access
   * @return      Array of all matching road conditions
   */
  private async getRoadConditions(beginDate?: Date, endDate?: Date, asInstance?: boolean): Promise<RoadCondition[]> {
    const userId: number = this.userService.getUserId();
    const  storedRoadconditions: RoadCondition[] = JSON.parse(await this.storage.get(this.ROAD_CONDITION_KEY));
    let roadconditions: RoadCondition[] = new Array<RoadCondition>();

    if (!storedRoadconditions) {
      return roadconditions;
    }

    if (asInstance) {
      storedRoadconditions.forEach((storedRoadCondition: RoadCondition) => {
        const orderPositions: OrderPositions = new OrderPositions();
        storedRoadCondition.orderPositions.standardOrderPositions.forEach(element => {
          orderPositions.addOrderPosition(new StandardOrderPosition(
              element.characteristicGroupProperty,
              element.conditionCharacteristicProperty,
              element.conditionIndicatorProperty,
              element.magnitudeProperty,
              element.magnitudeText,
              element.expansion,
              element.pictures
            ));
        });

        storedRoadCondition.orderPositions.signageOrderPosition.forEach(element => {
          orderPositions.addOrderPosition(new SignageOrderPosition(
              element.count,
              element.text,
              element.signCategoryProperty,
              element.sign,
              element.pictures
            ));
        });

        storedRoadCondition.orderPositions.customOrderPosition.forEach(element => {
          orderPositions.addOrderPosition(new CustomOrderPosition(
              element.count,
              element.text,
              element.pictures
            ));
        });

        roadconditions.push(
          new RoadCondition(
            new BasicData(storedRoadCondition.basicData),
            orderPositions,
            storedRoadCondition.comments,
            storedRoadCondition.userProperty
          )
        );
      });
    } else {
      roadconditions = storedRoadconditions;
    }

    roadconditions = roadconditions.filter((roadcondition: RoadCondition) => {
      return roadcondition.userProperty.id === userId;
    });

    if (beginDate && endDate) {
      beginDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      roadconditions = roadconditions.filter((roadcondition: RoadCondition) => {
        const detectionDate: Date = new Date(roadcondition.basicData.detectionDate);
        return detectionDate.getTime() >= beginDate.getTime() && detectionDate.getTime() <= endDate.getTime();
      });
    }

    return roadconditions;
  }

  /**
   * getNumberOfRoadConditions - Counts the number of road conditions of a user within a certain period of time.
   *
   * @param beginDate the begin of the time period
   * @param endDate   the end of the time period
   */
  public async getNumberOfRoadConditions(beginDate?: Date, endDate?: Date): Promise<number> {
    const roadconditions: RoadCondition[] = await this.getRoadConditions(beginDate, endDate);
    return roadconditions.length;
  }

  /**
   * exportRoadConditions - Exports the road conditions of a user within a certain period of time into an file.
   *
   * @param exportOption  type of export
   * @param beginDate     the begin of the time period
   * @param endDate       the end of the time period
   */
  public async exportRoadConditions(exportOption: ExportOption, beginDate?: Date, endDate?: Date): Promise<void> {
    let filename = await this.userService.getUsername() + '_export_' + new Date().getTime();
    if (beginDate && endDate) {
      filename += '_' + beginDate.toISOString().slice(0, 10) + '_' + endDate.toISOString().slice(0, 10);
    }

    if (exportOption === ExportOption.JSON) {
      const roadconditions: RoadCondition[] = await this.getRoadConditions(beginDate, endDate);
      this.exportService.export([JSON.stringify(roadconditions)], filename, exportOption);
    } else {
      const roadconditions: RoadCondition[] = await this.getRoadConditions(beginDate, endDate, true);
      this.exportService.export(await this.getRoadConditiontoExportData(roadconditions), filename, exportOption);
    }
  }

  /**
   * getRoadConditiontoExportData - Converts the data to be exported with its objects into individual fields and thus allows the export.
   *
   * @param roadconditions  road conditions to be exported
   */
  private getRoadConditiontoExportData(roadconditions: RoadCondition[]): any[] {
    const data = new Array<any>();
    roadconditions.forEach((roadCondition: RoadCondition) => {
      const defaultExportData: any = roadCondition.getDefaultExportData();

      roadCondition.orderPositions.standardOrderPositions.forEach(standardOrderPosition => {
        data.push({
          ...defaultExportData,
          ...standardOrderPosition.getExportData()
        });
      });
      roadCondition.orderPositions.signageOrderPosition.forEach(signageOrderPosition => {
        data.push({
          ...defaultExportData,
          ...signageOrderPosition.getExportData()
        });
      });
      roadCondition.orderPositions.customOrderPosition.forEach(customOrderPosition => {
        data.push({
          ...defaultExportData,
          ...customOrderPosition.getExportData()
        });
      });
    });

    return data;
  }

  /**
   * addPicture - An image is created by accessing the device camera.
   *
   * @return  the picture taken by the user
   */
  public async addPicture(): Promise<Picture> {
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    const imageData = await this.camera.getPicture(options);
    const filename = imageData.substring(imageData.lastIndexOf('/') + 1);
    const path =  imageData.substring(0, imageData.lastIndexOf('/') + 1);
    const dataUrl = await this.file.readAsDataURL(path, filename);
    return new Picture(filename, path, dataUrl);
  }

  /**
   * handleError - Error Handling of the Road Condition Recording Service.
   *
   * @param error error to handle
   */
  private handleError(error): void {
    if (!error) {
      return;
    }

    console.warn('An error occurred in RoadConditionRecordingService. Error: %s', error);
  }
}
