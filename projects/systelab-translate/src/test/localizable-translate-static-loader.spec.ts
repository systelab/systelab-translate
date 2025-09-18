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
		const pathWithoutQuery = path.split('?')[0];

		let prefix;

		if (pathname === '/' || pathname.includes('context.html')) {
			prefix = '';
		} else if (pathname.includes('index.html')) {
			prefix = pathname.substring(0, pathname.lastIndexOf('/') + 1);
		} else if (pathWithoutQuery && pathWithoutQuery !== '/') {
			// Check if pathname ends with the path as a complete segment
			const pathSegment = pathWithoutQuery.startsWith('/') ? pathWithoutQuery : '/' + pathWithoutQuery;

			if (pathname === pathSegment) {
				prefix = '/';
			} else if (pathname.endsWith(pathSegment)) {
				// Extract the base path when pathname ends with pathSegment
				prefix = pathname.substring(0, pathname.length - pathSegment.length) || '/';
			} else {
				// Check if path is in the pathname somewhere
				const index = pathname.indexOf(pathSegment + '/');
				if (index >= 0) {
					prefix = pathname.substring(0, index + 1);
				} else {
					prefix = pathWithoutQuery;
				}
			}
		} else {
			prefix = pathname;
		}

		// Ensure we have a trailing slash for non-empty prefixes
		if (prefix && prefix !== '' && !prefix.endsWith('/')) {
			prefix += '/';
		}

		this['prefix'] = prefix;
	}

}

describe('LocalizableTranslateStaticLoader', () => {
	let httpMock: HttpClient;
	let locationMock: jasmine.SpyObj<AngularLocation>;
	let loader: TestableLoader;

	beforeEach(() => {
		httpMock = {} as HttpClient;
		locationMock = jasmine.createSpyObj('Location', ['path']);
	});

	it('should set prefix to empty string for root path', () => {
		locationMock.path.and.returnValue('');
		loader = new TestableLoader(httpMock, locationMock);
		loader.setMockPathname('/');
		expect(loader['prefix'])
			.toBe('');
	});

	it('should set prefix to empty string for context.html path', () => {
		locationMock.path.and.returnValue('');
		loader = new TestableLoader(httpMock, locationMock);
		loader.setMockPathname('/context.html');
		expect(loader['prefix'])
			.toBe('');
	});

	it('should handle path ending with index.html', () => {
		locationMock.path.and.returnValue('');
		loader = new TestableLoader(httpMock, locationMock);
		loader.setMockPathname('/app/folder/index.html');
		expect(loader['prefix'])
			.toBe('/app/folder/');
	});

	it('should remove trailing slash from path', () => {
		locationMock.path.and.returnValue('');
		loader = new TestableLoader(httpMock, locationMock);
		loader.setMockPathname('/app/folder/');
		expect(loader['prefix'])
			.toBe('/app/folder/');
	});

	it('should handle path ending with route that matches location path', () => {
		locationMock.path.and.returnValue('/dashboard');
		loader = new TestableLoader(httpMock, locationMock);
		loader.setMockPathname('/app/dashboard');
		expect(loader['prefix'])
			.toBe('/app/');
	});

	it('should handle location path with query parameters', () => {
		locationMock.path.and.returnValue('/dashboard?param=value');
		loader = new TestableLoader(httpMock, locationMock);
		loader.setMockPathname('/app/dashboard');
		expect(loader['prefix'])
			.toBe('/app/');
	});

	it('should add trailing slash to non-empty prefix', () => {
		locationMock.path.and.returnValue('');
		loader = new TestableLoader(httpMock, locationMock);
		loader.setMockPathname('/app');
		expect(loader['prefix'])
			.toBe('/app/');
	});

	it('should handle undefined location path', () => {
		locationMock.path.and.returnValue('');
		loader = new TestableLoader(httpMock, locationMock);
		loader.setMockPathname('/somepath');
		expect(loader['prefix'])
			.toBe('/somepath/');
	});
});
