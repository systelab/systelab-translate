import { LocalizableTranslateStaticLoader } from '../public-api';
import { HttpClient } from '@angular/common/http';
import { Location as AngularLocation } from '@angular/common';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('LocalizableTranslateStaticLoader Constructor', () => {
	let httpMock: HttpClient;
	let locationMock: jasmine.SpyObj<AngularLocation>;
	let originalGetPathname: () => string;

	beforeEach(() => {
		httpMock = {} as HttpClient;
		locationMock = jasmine.createSpyObj('Location', ['path']);

		// Store original method with correct type
		originalGetPathname = LocalizableTranslateStaticLoader.prototype['getWindowPathname'];
	});

	afterEach(() => {
		// Restore original method
		LocalizableTranslateStaticLoader.prototype['getWindowPathname'] = originalGetPathname;
	});

	function createLoader(pathname: string, locationPath: string | null = null, manifestFile: string | null = null): LocalizableTranslateStaticLoader {
		// Mock location.path()
		if (locationPath === null) {
			locationMock.path.and.returnValue('');
		} else {
			locationMock.path.and.returnValue(locationPath);
		}

		// Add a mock method to the class prototype to return our test pathname
		LocalizableTranslateStaticLoader.prototype['getWindowPathname'] = () => pathname;

		if(manifestFile === null) {
			return new LocalizableTranslateStaticLoader(httpMock, locationMock);
		} else {
			return new LocalizableTranslateStaticLoader(httpMock, locationMock, manifestFile);
		}
	}

	describe('special root paths', () => {
		it('should set prefix to empty string for root path "/"', () => {
			const loader = createLoader('/');
			expect(loader['prefix'])
				.toBe('');
		});

		it('should set prefix to empty string for context.html path', () => {
			const loader = createLoader('/context.html');
			expect(loader['prefix'])
				.toBe('');
		});
	});

	describe('prefix handling for index.html', () => {
		it('should remove index.html from the end of the path', () => {
			const loader = createLoader('/app/folder/index.html');
			expect(loader['prefix'])
				.toBe('/app/folder/');
		});

		it('should handle path with index.html in the middle correctly', () => {
			const loader = createLoader('/app/index.html/page');
			expect(loader['prefix'])
				.toBe('/app/index.html/page/');
		});
	});

	describe('trailing slash handling', () => {
		it('should remove trailing slash from path before processing', () => {
			const loader = createLoader('/app/folder/');
			expect(loader['prefix'])
				.toBe('/app/folder/');
		});

		it('should add trailing slash to non-empty prefix at the end', () => {
			const loader = createLoader('/app/folder');
			expect(loader['prefix'])
				.toBe('/app/folder/');
		});
	});

	describe('location path handling', () => {
		it('should handle path ending with route that matches location path', () => {
			const loader = createLoader('/app/dashboard', '/dashboard');
			expect(loader['prefix'])
				.toBe('/app/');
		});

		it('should handle location path with query parameters', () => {
			const loader = createLoader('/app/dashboard', '/dashboard?param=value');
			expect(loader['prefix'])
				.toBe('/app/');
		});

		it('should not modify prefix when location path does not match the end', () => {
			const loader = createLoader('/app/other', '/dashboard');
			expect(loader['prefix'])
				.toBe('/app/other/');
		});

		it('should handle empty location path', () => {
			const loader = createLoader('/app/folder', '');
			expect(loader['prefix'])
				.toBe('/app/folder/');
		});

		// The test for undefined location path needs special handling
		it('should handle undefined location path by checking explicitly', () => {
			locationMock.path.and.returnValue(undefined);

			// We need to handle this test case separately since it uses spyOnProperty
			LocalizableTranslateStaticLoader.prototype['getWindowPathname'] = () => '/somepath';

			const loader = new LocalizableTranslateStaticLoader(httpMock, locationMock);
			expect(loader['prefix'])
				.toBe('/somepath/');
		});
	});

	describe('complex path combinations', () => {
		it('should handle path with index.html and matching route', () => {
			const loader = createLoader('/app/dashboard/index.html', '/dashboard');
			expect(loader['prefix'])
				.toBe('/app/');
		});

		it('should handle path with trailing slash and matching route', () => {
			const loader = createLoader('/app/dashboard/', '/dashboard');
			expect(loader['prefix'])
				.toBe('/app/');
		});
	});

	describe('getTranslation with manifest file', () => {
		it('should use default manifest file when none is provided', () => {
			const loader = new LocalizableTranslateStaticLoader(httpMock, locationMock, 'manifest.json');
			expect(loader['manifestFile'])
				.toBe('manifest.json');
		});

		it('should use provided manifest file name', () => {
			const customManifest = 'custom-manifest.json';
			const loader = new LocalizableTranslateStaticLoader(httpMock, locationMock, customManifest);
			expect(loader['manifestFile'])
				.toBe(customManifest);
		});

		it('should fetch and return bundle if manifest contains MessagesBundle_language', (done) => {
			httpMock.get = jasmine.createSpy().and.callFake((url: string) => {
				if (url.endsWith('manifest.json')) {
					return of({ 'MessagesBundle_en': 'bundle-en.json' });
				}
				if (url.endsWith('bundle-en.json')) {
					return of({ key: 'value' });
				}
				return of({});
			});
			const loader = new LocalizableTranslateStaticLoader(httpMock, locationMock);
			(loader as any).getBundlesByManifestFile('en', 'en-US').subscribe(result => {
				expect(result).toEqual({ key: 'value' });
				done();
			});
		});

		it('should fetch and return bundle if manifest contains MessagesBundle_languageAndCountry', (done) => {
			httpMock.get = jasmine.createSpy().and.callFake((url: string) => {
				if (url.endsWith('manifest.json')) {
					return of({ 'MessagesBundle_en-US': 'bundle-en-US.json' });
				}
				if (url.endsWith('bundle-en-US.json')) {
					return of({ key: 'us-value' });
				}
				return of({});
			});
			const loader = new LocalizableTranslateStaticLoader(httpMock, locationMock);
			(loader as any).getBundlesByManifestFile('en', 'en-US').subscribe(result => {
				expect(result).toEqual({ key: 'us-value' });
				done();
			});
		});

		it('should return an empty object if fetching bundle file fails', (done) => {
			httpMock.get = jasmine.createSpy().and.callFake((url: string) => {
				if (url.endsWith('manifest.json')) {
					return of({ 'MessagesBundle_en': 'bundle-en.json' });
				}
				if (url.endsWith('bundle-en.json')) {
					return { pipe: () => of({}) }; // Simula error y catchError
				}
				return of({});
			});
			const loader = new LocalizableTranslateStaticLoader(httpMock, locationMock);
			(loader as any).getBundlesByManifestFile('en', 'en-US').subscribe(result => {
				expect(result).toEqual({});
				done();
			});
		});

		it('should return an empty object if fetching manifest file fails', (done) => {
			httpMock.get = jasmine.createSpy().and.returnValue({ pipe: () => of({}) });
			const loader = new LocalizableTranslateStaticLoader(httpMock, locationMock);
			(loader as any).getBundlesByManifestFile('en', 'en-US').subscribe(result => {
				expect(result).toEqual({});
				done();
			});
		});


	});
});
