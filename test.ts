import {AlertController, GestureController, ActionSheetController, ModalController} from 'ionic-angular'
// This file is required by karma.conf.js and loads recursively all the .spec
// and framework files
import 'zone.js/dist/long-stack-trace-zone'
import 'zone.js/dist/proxy.js'
import 'zone.js/dist/sync-test'
import 'zone.js/dist/jasmine-patch'
import 'zone.js/dist/async-test'
import 'zone.js/dist/fake-async-test'

import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {getTestBed, TestBed, ComponentFixtureAutoDetect} from '@angular/core/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'
import {
  App,
  Config,
  DeepLinker,
  Form,
  IonicModule,
  Keyboard,
  DomController,
  MenuController,
  NavController,
  Platform,
  ToastController,
  LoadingController,
  NavParams
} from 'ionic-angular'
import {
  ConfigMock,
  PlatformMock,
  AlertControllerMock,
  ActionSheetControllerMock,
  ModalControllerMock,
  LoadingControllerMock,
  ToastControllerMock
} from 'ionic-mocks'

import {Api} from './providers/api/api'
import {AuthService} from './providers/service/auth'
import {BankService} from './providers/service/bank'
import {PayService} from './providers/service/pay'
import {UserService} from './providers/service/user'
import {HttpModule, Http, ConnectionBackend, BaseRequestOptions} from '@angular/http'
import {MockBackend} from '@angular/http/testing'

declare const require : any

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
// Then we find all the tests.
const context : any = require.context('./', true, /\.spec\.ts$/)
// And load the modules.
context
  .keys()
  .map(context)

export class TestUtils {
  // And this is just a wrapper we’ll call from beforeEach to compile your
  // components:
  public static beforeEachCompiler(components : Array < any >) : Promise < {
    fixture: any;
    instance: any
  } > {
    return TestUtils
      .configureIonicTestingModule(components)
      .compileComponents()
      .then(() => {
        let fixture : any = TestBed.createComponent(components[0])
        return {fixture: fixture, instance: fixture.debugElement.componentInstance}
      })
  }

  // The following function configureIonicTestingModule takes one or more of your
  // components and sets up an Ionic test bed for them:
  public static configureIonicTestingModule(components : Array < any >) : typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [...components],
      providers: [
        App,
        Form,
        Keyboard,
        DomController,
        MenuController,
        NavController,
        // ToastController,
        NavParams,
        // AlertController,
        GestureController,
        Api,
        AuthService,
        BankService,
        PayService,
        UserService, {
          provide: Platform,
          useFactory: () => PlatformMock.instance()
        }, {
          provide: Config,
          useFactory: () => ConfigMock.instance()
        }, {
          provide: DeepLinker,
          useFactory: () => ConfigMock.instance()
        }, {
          provide: AlertController,
          useFactory: () => AlertControllerMock.instance()
        }, {
          provide: ComponentFixtureAutoDetect,
          useValue: true
        }, {
          provide: ActionSheetController,
          useFactory: () => ActionSheetControllerMock.instance()
        }, {
          provide: ModalController,
          useFactory: () => ModalControllerMock.instance()
        }, {
          provide: LoadingController,
          useFactory: () => LoadingControllerMock.instance()
        }, {
          provide: ToastController,
          useFactory: () => ToastControllerMock.instance()
        }
      ],
      imports: [FormsModule, IonicModule, ReactiveFormsModule, HttpModule]
    })
  }

  // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javas
  // cript
  public static eventFire(el : any, etype : string) : void {
    if(el.fireEvent) {
      el.fireEvent('on' + etype)
    } else {
      let evObj : any = document.createEvent('Events')
      evObj.initEvent(etype, true, false)
      el.dispatchEvent(evObj)
    }
  }
}
