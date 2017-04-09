import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import '../css/foundation.css';
import '../css/app.css';



const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
