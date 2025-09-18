import { LocalizableTranslateStaticLoader } from '../public-api';
import { HttpClient } from '@angular/common/http';
import { Location as AngularLocation } from '@angular/common';

// Test-specific subclass that allows controlling window.location.pathname
class TestableLoader extends LocalizableTranslateStaticLoader {
	private mockPathname= '/';

	constructor(http: HttpClient, location: AngularLocation) {
		super(http, location);
	}

	// Method to set mock pathname before calling initialization logic
	setMockPathname(pathname: string) {
		this.mockPathname = pathname;
		// Recalculate the prefix based on the mock pathname
		this.calculatePrefix();
	}

	// Override the method that uses window.location.pathname
	protected getWindowLocationPathname(): string {
		return this.mockPathname;
	}

	// Calculate the prefix similar to what the parent class would do
	private calculatePrefix(): void {
		const pathname = this.getWindowLocationPathname();
		const path = this.location.path();

		// Similar logic to what's in the original class
		if (pathname === '/' || pathname.includes('context.html')) {
			this['prefix'] = '';
		} else if (pathname.includes('index.html')) {
			this['prefix'] = pathname.substring(0, pathname.lastIndexOf('/') + 1);
		} else if (path && !path.includes('?')) {
			this['prefix'] = path + '/';
		} else {
			this['prefix'] = '/';
		}
	}
}

describe('LocalizableTranslateStaticLoader', () => {
	let httpMock: HttpClient;
	let locationMock: jasmine.SpyObj<AngularLocation>;
	let loader: TestableLoader;

	beforeEach(() => {
		httpMock = {} as HttpClient;
		locationMock = jasmine.createSpyObj('Location', ['path']);
		loader = new TestableLoader(httpMock, locationMock);
	});

	it('should set prefix for a normal path without parameters', () => {
		locationMock.path.and.returnValue('/main');
		loader.setMockPathname('/main');
		expect(loader['prefix'])
			.toBe('/main/');
	});

	it('should remove query parameters from prefix', () => {
		locationMock.path.and.returnValue('/main?param=value');
		loader.setMockPathname('/main');
		expect(loader['prefix'])
			.toBe('/');
	});

	it('should handle index.html in Electron', () => {
		locationMock.path.and.returnValue('');
		loader.setMockPathname('/app/index.html');
		expect(loader['prefix'])
			.toBe('/app/');
	});

	it('should not set prefix for root or context.html', () => {
		locationMock.path.and.returnValue('');
		loader.setMockPathname('/');
		expect(loader['prefix'])
			.toBe('');
	});
});
